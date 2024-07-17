import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUserOnline, NewUserOnline } from '../user-online.model';

export type PartialUpdateUserOnline = Partial<IUserOnline> & Pick<IUserOnline, 'id'>;

export type EntityResponseType = HttpResponse<IUserOnline>;
export type EntityArrayResponseType = HttpResponse<IUserOnline[]>;

@Injectable({ providedIn: 'root' })
export class UserOnlineService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/user-onlines');

  create(userOnline: NewUserOnline): Observable<EntityResponseType> {
    return this.http.post<IUserOnline>(this.resourceUrl, userOnline, { observe: 'response' });
  }

  update(userOnline: IUserOnline): Observable<EntityResponseType> {
    return this.http.put<IUserOnline>(`${this.resourceUrl}/${this.getUserOnlineIdentifier(userOnline)}`, userOnline, {
      observe: 'response',
    });
  }

  partialUpdate(userOnline: PartialUpdateUserOnline): Observable<EntityResponseType> {
    return this.http.patch<IUserOnline>(`${this.resourceUrl}/${this.getUserOnlineIdentifier(userOnline)}`, userOnline, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserOnline>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserOnline[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUserOnlineIdentifier(userOnline: Pick<IUserOnline, 'id'>): number {
    return userOnline.id;
  }

  compareUserOnline(o1: Pick<IUserOnline, 'id'> | null, o2: Pick<IUserOnline, 'id'> | null): boolean {
    return o1 && o2 ? this.getUserOnlineIdentifier(o1) === this.getUserOnlineIdentifier(o2) : o1 === o2;
  }

  addUserOnlineToCollectionIfMissing<Type extends Pick<IUserOnline, 'id'>>(
    userOnlineCollection: Type[],
    ...userOnlinesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const userOnlines: Type[] = userOnlinesToCheck.filter(isPresent);
    if (userOnlines.length > 0) {
      const userOnlineCollectionIdentifiers = userOnlineCollection.map(userOnlineItem => this.getUserOnlineIdentifier(userOnlineItem));
      const userOnlinesToAdd = userOnlines.filter(userOnlineItem => {
        const userOnlineIdentifier = this.getUserOnlineIdentifier(userOnlineItem);
        if (userOnlineCollectionIdentifiers.includes(userOnlineIdentifier)) {
          return false;
        }
        userOnlineCollectionIdentifiers.push(userOnlineIdentifier);
        return true;
      });
      return [...userOnlinesToAdd, ...userOnlineCollection];
    }
    return userOnlineCollection;
  }
}
