import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucQuocGia, NewDanhMucQuocGia } from '../danh-muc-quoc-gia.model';

export type PartialUpdateDanhMucQuocGia = Partial<IDanhMucQuocGia> & Pick<IDanhMucQuocGia, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucQuocGia>;
export type EntityArrayResponseType = HttpResponse<IDanhMucQuocGia[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucQuocGiaService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-quoc-gias');

  create(danhMucQuocGia: NewDanhMucQuocGia): Observable<EntityResponseType> {
    return this.http.post<IDanhMucQuocGia>(this.resourceUrl, danhMucQuocGia, { observe: 'response' });
  }

  update(danhMucQuocGia: IDanhMucQuocGia): Observable<EntityResponseType> {
    return this.http.put<IDanhMucQuocGia>(`${this.resourceUrl}/${this.getDanhMucQuocGiaIdentifier(danhMucQuocGia)}`, danhMucQuocGia, {
      observe: 'response',
    });
  }

  partialUpdate(danhMucQuocGia: PartialUpdateDanhMucQuocGia): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucQuocGia>(`${this.resourceUrl}/${this.getDanhMucQuocGiaIdentifier(danhMucQuocGia)}`, danhMucQuocGia, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucQuocGia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucQuocGia[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucQuocGiaIdentifier(danhMucQuocGia: Pick<IDanhMucQuocGia, 'id'>): number {
    return danhMucQuocGia.id;
  }

  compareDanhMucQuocGia(o1: Pick<IDanhMucQuocGia, 'id'> | null, o2: Pick<IDanhMucQuocGia, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucQuocGiaIdentifier(o1) === this.getDanhMucQuocGiaIdentifier(o2) : o1 === o2;
  }

  addDanhMucQuocGiaToCollectionIfMissing<Type extends Pick<IDanhMucQuocGia, 'id'>>(
    danhMucQuocGiaCollection: Type[],
    ...danhMucQuocGiasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucQuocGias: Type[] = danhMucQuocGiasToCheck.filter(isPresent);
    if (danhMucQuocGias.length > 0) {
      const danhMucQuocGiaCollectionIdentifiers = danhMucQuocGiaCollection.map(danhMucQuocGiaItem =>
        this.getDanhMucQuocGiaIdentifier(danhMucQuocGiaItem),
      );
      const danhMucQuocGiasToAdd = danhMucQuocGias.filter(danhMucQuocGiaItem => {
        const danhMucQuocGiaIdentifier = this.getDanhMucQuocGiaIdentifier(danhMucQuocGiaItem);
        if (danhMucQuocGiaCollectionIdentifiers.includes(danhMucQuocGiaIdentifier)) {
          return false;
        }
        danhMucQuocGiaCollectionIdentifiers.push(danhMucQuocGiaIdentifier);
        return true;
      });
      return [...danhMucQuocGiasToAdd, ...danhMucQuocGiaCollection];
    }
    return danhMucQuocGiaCollection;
  }
}
