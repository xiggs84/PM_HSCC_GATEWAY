import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INoiCapGttt, NewNoiCapGttt } from '../noi-cap-gttt.model';

export type PartialUpdateNoiCapGttt = Partial<INoiCapGttt> & Pick<INoiCapGttt, 'id'>;

export type EntityResponseType = HttpResponse<INoiCapGttt>;
export type EntityArrayResponseType = HttpResponse<INoiCapGttt[]>;

@Injectable({ providedIn: 'root' })
export class NoiCapGtttService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/noi-cap-gttts');

  create(noiCapGttt: NewNoiCapGttt): Observable<EntityResponseType> {
    return this.http.post<INoiCapGttt>(this.resourceUrl, noiCapGttt, { observe: 'response' });
  }

  update(noiCapGttt: INoiCapGttt): Observable<EntityResponseType> {
    return this.http.put<INoiCapGttt>(`${this.resourceUrl}/${this.getNoiCapGtttIdentifier(noiCapGttt)}`, noiCapGttt, {
      observe: 'response',
    });
  }

  partialUpdate(noiCapGttt: PartialUpdateNoiCapGttt): Observable<EntityResponseType> {
    return this.http.patch<INoiCapGttt>(`${this.resourceUrl}/${this.getNoiCapGtttIdentifier(noiCapGttt)}`, noiCapGttt, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INoiCapGttt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INoiCapGttt[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNoiCapGtttIdentifier(noiCapGttt: Pick<INoiCapGttt, 'id'>): number {
    return noiCapGttt.id;
  }

  compareNoiCapGttt(o1: Pick<INoiCapGttt, 'id'> | null, o2: Pick<INoiCapGttt, 'id'> | null): boolean {
    return o1 && o2 ? this.getNoiCapGtttIdentifier(o1) === this.getNoiCapGtttIdentifier(o2) : o1 === o2;
  }

  addNoiCapGtttToCollectionIfMissing<Type extends Pick<INoiCapGttt, 'id'>>(
    noiCapGtttCollection: Type[],
    ...noiCapGtttsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const noiCapGttts: Type[] = noiCapGtttsToCheck.filter(isPresent);
    if (noiCapGttts.length > 0) {
      const noiCapGtttCollectionIdentifiers = noiCapGtttCollection.map(noiCapGtttItem => this.getNoiCapGtttIdentifier(noiCapGtttItem));
      const noiCapGtttsToAdd = noiCapGttts.filter(noiCapGtttItem => {
        const noiCapGtttIdentifier = this.getNoiCapGtttIdentifier(noiCapGtttItem);
        if (noiCapGtttCollectionIdentifiers.includes(noiCapGtttIdentifier)) {
          return false;
        }
        noiCapGtttCollectionIdentifiers.push(noiCapGtttIdentifier);
        return true;
      });
      return [...noiCapGtttsToAdd, ...noiCapGtttCollection];
    }
    return noiCapGtttCollection;
  }
}
