import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaisanSaiQsddDgc, NewTaisanSaiQsddDgc } from '../taisan-sai-qsdd-dgc.model';

export type PartialUpdateTaisanSaiQsddDgc = Partial<ITaisanSaiQsddDgc> & Pick<ITaisanSaiQsddDgc, 'id'>;

export type EntityResponseType = HttpResponse<ITaisanSaiQsddDgc>;
export type EntityArrayResponseType = HttpResponse<ITaisanSaiQsddDgc[]>;

@Injectable({ providedIn: 'root' })
export class TaisanSaiQsddDgcService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/taisan-sai-qsdd-dgcs');

  create(taisanSaiQsddDgc: NewTaisanSaiQsddDgc): Observable<EntityResponseType> {
    return this.http.post<ITaisanSaiQsddDgc>(this.resourceUrl, taisanSaiQsddDgc, { observe: 'response' });
  }

  update(taisanSaiQsddDgc: ITaisanSaiQsddDgc): Observable<EntityResponseType> {
    return this.http.put<ITaisanSaiQsddDgc>(
      `${this.resourceUrl}/${this.getTaisanSaiQsddDgcIdentifier(taisanSaiQsddDgc)}`,
      taisanSaiQsddDgc,
      { observe: 'response' },
    );
  }

  partialUpdate(taisanSaiQsddDgc: PartialUpdateTaisanSaiQsddDgc): Observable<EntityResponseType> {
    return this.http.patch<ITaisanSaiQsddDgc>(
      `${this.resourceUrl}/${this.getTaisanSaiQsddDgcIdentifier(taisanSaiQsddDgc)}`,
      taisanSaiQsddDgc,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaisanSaiQsddDgc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaisanSaiQsddDgc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTaisanSaiQsddDgcIdentifier(taisanSaiQsddDgc: Pick<ITaisanSaiQsddDgc, 'id'>): number {
    return taisanSaiQsddDgc.id;
  }

  compareTaisanSaiQsddDgc(o1: Pick<ITaisanSaiQsddDgc, 'id'> | null, o2: Pick<ITaisanSaiQsddDgc, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaisanSaiQsddDgcIdentifier(o1) === this.getTaisanSaiQsddDgcIdentifier(o2) : o1 === o2;
  }

  addTaisanSaiQsddDgcToCollectionIfMissing<Type extends Pick<ITaisanSaiQsddDgc, 'id'>>(
    taisanSaiQsddDgcCollection: Type[],
    ...taisanSaiQsddDgcsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taisanSaiQsddDgcs: Type[] = taisanSaiQsddDgcsToCheck.filter(isPresent);
    if (taisanSaiQsddDgcs.length > 0) {
      const taisanSaiQsddDgcCollectionIdentifiers = taisanSaiQsddDgcCollection.map(taisanSaiQsddDgcItem =>
        this.getTaisanSaiQsddDgcIdentifier(taisanSaiQsddDgcItem),
      );
      const taisanSaiQsddDgcsToAdd = taisanSaiQsddDgcs.filter(taisanSaiQsddDgcItem => {
        const taisanSaiQsddDgcIdentifier = this.getTaisanSaiQsddDgcIdentifier(taisanSaiQsddDgcItem);
        if (taisanSaiQsddDgcCollectionIdentifiers.includes(taisanSaiQsddDgcIdentifier)) {
          return false;
        }
        taisanSaiQsddDgcCollectionIdentifiers.push(taisanSaiQsddDgcIdentifier);
        return true;
      });
      return [...taisanSaiQsddDgcsToAdd, ...taisanSaiQsddDgcCollection];
    }
    return taisanSaiQsddDgcCollection;
  }
}
