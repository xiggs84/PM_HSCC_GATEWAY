import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaisanSaiDgc, NewTaisanSaiDgc } from '../taisan-sai-dgc.model';

export type PartialUpdateTaisanSaiDgc = Partial<ITaisanSaiDgc> & Pick<ITaisanSaiDgc, 'id'>;

export type EntityResponseType = HttpResponse<ITaisanSaiDgc>;
export type EntityArrayResponseType = HttpResponse<ITaisanSaiDgc[]>;

@Injectable({ providedIn: 'root' })
export class TaisanSaiDgcService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/taisan-sai-dgcs');

  create(taisanSaiDgc: NewTaisanSaiDgc): Observable<EntityResponseType> {
    return this.http.post<ITaisanSaiDgc>(this.resourceUrl, taisanSaiDgc, { observe: 'response' });
  }

  update(taisanSaiDgc: ITaisanSaiDgc): Observable<EntityResponseType> {
    return this.http.put<ITaisanSaiDgc>(`${this.resourceUrl}/${this.getTaisanSaiDgcIdentifier(taisanSaiDgc)}`, taisanSaiDgc, {
      observe: 'response',
    });
  }

  partialUpdate(taisanSaiDgc: PartialUpdateTaisanSaiDgc): Observable<EntityResponseType> {
    return this.http.patch<ITaisanSaiDgc>(`${this.resourceUrl}/${this.getTaisanSaiDgcIdentifier(taisanSaiDgc)}`, taisanSaiDgc, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaisanSaiDgc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaisanSaiDgc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTaisanSaiDgcIdentifier(taisanSaiDgc: Pick<ITaisanSaiDgc, 'id'>): number {
    return taisanSaiDgc.id;
  }

  compareTaisanSaiDgc(o1: Pick<ITaisanSaiDgc, 'id'> | null, o2: Pick<ITaisanSaiDgc, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaisanSaiDgcIdentifier(o1) === this.getTaisanSaiDgcIdentifier(o2) : o1 === o2;
  }

  addTaisanSaiDgcToCollectionIfMissing<Type extends Pick<ITaisanSaiDgc, 'id'>>(
    taisanSaiDgcCollection: Type[],
    ...taisanSaiDgcsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taisanSaiDgcs: Type[] = taisanSaiDgcsToCheck.filter(isPresent);
    if (taisanSaiDgcs.length > 0) {
      const taisanSaiDgcCollectionIdentifiers = taisanSaiDgcCollection.map(taisanSaiDgcItem =>
        this.getTaisanSaiDgcIdentifier(taisanSaiDgcItem),
      );
      const taisanSaiDgcsToAdd = taisanSaiDgcs.filter(taisanSaiDgcItem => {
        const taisanSaiDgcIdentifier = this.getTaisanSaiDgcIdentifier(taisanSaiDgcItem);
        if (taisanSaiDgcCollectionIdentifiers.includes(taisanSaiDgcIdentifier)) {
          return false;
        }
        taisanSaiDgcCollectionIdentifiers.push(taisanSaiDgcIdentifier);
        return true;
      });
      return [...taisanSaiDgcsToAdd, ...taisanSaiDgcCollection];
    }
    return taisanSaiDgcCollection;
  }
}
