import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucXa, NewDanhMucXa } from '../danh-muc-xa.model';

export type PartialUpdateDanhMucXa = Partial<IDanhMucXa> & Pick<IDanhMucXa, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucXa>;
export type EntityArrayResponseType = HttpResponse<IDanhMucXa[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucXaService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-xas');

  create(danhMucXa: NewDanhMucXa): Observable<EntityResponseType> {
    return this.http.post<IDanhMucXa>(this.resourceUrl, danhMucXa, { observe: 'response' });
  }

  update(danhMucXa: IDanhMucXa): Observable<EntityResponseType> {
    return this.http.put<IDanhMucXa>(`${this.resourceUrl}/${this.getDanhMucXaIdentifier(danhMucXa)}`, danhMucXa, { observe: 'response' });
  }

  partialUpdate(danhMucXa: PartialUpdateDanhMucXa): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucXa>(`${this.resourceUrl}/${this.getDanhMucXaIdentifier(danhMucXa)}`, danhMucXa, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucXa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucXa[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucXaIdentifier(danhMucXa: Pick<IDanhMucXa, 'id'>): number {
    return danhMucXa.id;
  }

  compareDanhMucXa(o1: Pick<IDanhMucXa, 'id'> | null, o2: Pick<IDanhMucXa, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucXaIdentifier(o1) === this.getDanhMucXaIdentifier(o2) : o1 === o2;
  }

  addDanhMucXaToCollectionIfMissing<Type extends Pick<IDanhMucXa, 'id'>>(
    danhMucXaCollection: Type[],
    ...danhMucXasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucXas: Type[] = danhMucXasToCheck.filter(isPresent);
    if (danhMucXas.length > 0) {
      const danhMucXaCollectionIdentifiers = danhMucXaCollection.map(danhMucXaItem => this.getDanhMucXaIdentifier(danhMucXaItem));
      const danhMucXasToAdd = danhMucXas.filter(danhMucXaItem => {
        const danhMucXaIdentifier = this.getDanhMucXaIdentifier(danhMucXaItem);
        if (danhMucXaCollectionIdentifiers.includes(danhMucXaIdentifier)) {
          return false;
        }
        danhMucXaCollectionIdentifiers.push(danhMucXaIdentifier);
        return true;
      });
      return [...danhMucXasToAdd, ...danhMucXaCollection];
    }
    return danhMucXaCollection;
  }
}
