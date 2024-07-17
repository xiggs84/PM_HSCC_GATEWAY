import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaisannhadatid, NewTaisannhadatid } from '../taisannhadatid.model';

export type PartialUpdateTaisannhadatid = Partial<ITaisannhadatid> & Pick<ITaisannhadatid, 'id'>;

export type EntityResponseType = HttpResponse<ITaisannhadatid>;
export type EntityArrayResponseType = HttpResponse<ITaisannhadatid[]>;

@Injectable({ providedIn: 'root' })
export class TaisannhadatidService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/taisannhadatids');

  create(taisannhadatid: NewTaisannhadatid): Observable<EntityResponseType> {
    return this.http.post<ITaisannhadatid>(this.resourceUrl, taisannhadatid, { observe: 'response' });
  }

  update(taisannhadatid: ITaisannhadatid): Observable<EntityResponseType> {
    return this.http.put<ITaisannhadatid>(`${this.resourceUrl}/${this.getTaisannhadatidIdentifier(taisannhadatid)}`, taisannhadatid, {
      observe: 'response',
    });
  }

  partialUpdate(taisannhadatid: PartialUpdateTaisannhadatid): Observable<EntityResponseType> {
    return this.http.patch<ITaisannhadatid>(`${this.resourceUrl}/${this.getTaisannhadatidIdentifier(taisannhadatid)}`, taisannhadatid, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaisannhadatid>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaisannhadatid[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTaisannhadatidIdentifier(taisannhadatid: Pick<ITaisannhadatid, 'id'>): number {
    return taisannhadatid.id;
  }

  compareTaisannhadatid(o1: Pick<ITaisannhadatid, 'id'> | null, o2: Pick<ITaisannhadatid, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaisannhadatidIdentifier(o1) === this.getTaisannhadatidIdentifier(o2) : o1 === o2;
  }

  addTaisannhadatidToCollectionIfMissing<Type extends Pick<ITaisannhadatid, 'id'>>(
    taisannhadatidCollection: Type[],
    ...taisannhadatidsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taisannhadatids: Type[] = taisannhadatidsToCheck.filter(isPresent);
    if (taisannhadatids.length > 0) {
      const taisannhadatidCollectionIdentifiers = taisannhadatidCollection.map(taisannhadatidItem =>
        this.getTaisannhadatidIdentifier(taisannhadatidItem),
      );
      const taisannhadatidsToAdd = taisannhadatids.filter(taisannhadatidItem => {
        const taisannhadatidIdentifier = this.getTaisannhadatidIdentifier(taisannhadatidItem);
        if (taisannhadatidCollectionIdentifiers.includes(taisannhadatidIdentifier)) {
          return false;
        }
        taisannhadatidCollectionIdentifiers.push(taisannhadatidIdentifier);
        return true;
      });
      return [...taisannhadatidsToAdd, ...taisannhadatidCollection];
    }
    return taisannhadatidCollection;
  }
}
