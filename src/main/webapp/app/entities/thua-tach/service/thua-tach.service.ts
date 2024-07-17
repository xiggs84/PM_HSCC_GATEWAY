import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IThuaTach, NewThuaTach } from '../thua-tach.model';

export type PartialUpdateThuaTach = Partial<IThuaTach> & Pick<IThuaTach, 'id'>;

export type EntityResponseType = HttpResponse<IThuaTach>;
export type EntityArrayResponseType = HttpResponse<IThuaTach[]>;

@Injectable({ providedIn: 'root' })
export class ThuaTachService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/thua-taches');

  create(thuaTach: NewThuaTach): Observable<EntityResponseType> {
    return this.http.post<IThuaTach>(this.resourceUrl, thuaTach, { observe: 'response' });
  }

  update(thuaTach: IThuaTach): Observable<EntityResponseType> {
    return this.http.put<IThuaTach>(`${this.resourceUrl}/${this.getThuaTachIdentifier(thuaTach)}`, thuaTach, { observe: 'response' });
  }

  partialUpdate(thuaTach: PartialUpdateThuaTach): Observable<EntityResponseType> {
    return this.http.patch<IThuaTach>(`${this.resourceUrl}/${this.getThuaTachIdentifier(thuaTach)}`, thuaTach, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IThuaTach>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IThuaTach[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getThuaTachIdentifier(thuaTach: Pick<IThuaTach, 'id'>): number {
    return thuaTach.id;
  }

  compareThuaTach(o1: Pick<IThuaTach, 'id'> | null, o2: Pick<IThuaTach, 'id'> | null): boolean {
    return o1 && o2 ? this.getThuaTachIdentifier(o1) === this.getThuaTachIdentifier(o2) : o1 === o2;
  }

  addThuaTachToCollectionIfMissing<Type extends Pick<IThuaTach, 'id'>>(
    thuaTachCollection: Type[],
    ...thuaTachesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const thuaTaches: Type[] = thuaTachesToCheck.filter(isPresent);
    if (thuaTaches.length > 0) {
      const thuaTachCollectionIdentifiers = thuaTachCollection.map(thuaTachItem => this.getThuaTachIdentifier(thuaTachItem));
      const thuaTachesToAdd = thuaTaches.filter(thuaTachItem => {
        const thuaTachIdentifier = this.getThuaTachIdentifier(thuaTachItem);
        if (thuaTachCollectionIdentifiers.includes(thuaTachIdentifier)) {
          return false;
        }
        thuaTachCollectionIdentifiers.push(thuaTachIdentifier);
        return true;
      });
      return [...thuaTachesToAdd, ...thuaTachCollection];
    }
    return thuaTachCollection;
  }
}
