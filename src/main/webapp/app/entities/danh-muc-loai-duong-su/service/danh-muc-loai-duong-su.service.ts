import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucLoaiDuongSu, NewDanhMucLoaiDuongSu } from '../danh-muc-loai-duong-su.model';

export type PartialUpdateDanhMucLoaiDuongSu = Partial<IDanhMucLoaiDuongSu> & Pick<IDanhMucLoaiDuongSu, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucLoaiDuongSu>;
export type EntityArrayResponseType = HttpResponse<IDanhMucLoaiDuongSu[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiDuongSuService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-loai-duong-sus');

  create(danhMucLoaiDuongSu: NewDanhMucLoaiDuongSu): Observable<EntityResponseType> {
    return this.http.post<IDanhMucLoaiDuongSu>(this.resourceUrl, danhMucLoaiDuongSu, { observe: 'response' });
  }

  update(danhMucLoaiDuongSu: IDanhMucLoaiDuongSu): Observable<EntityResponseType> {
    return this.http.put<IDanhMucLoaiDuongSu>(
      `${this.resourceUrl}/${this.getDanhMucLoaiDuongSuIdentifier(danhMucLoaiDuongSu)}`,
      danhMucLoaiDuongSu,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucLoaiDuongSu: PartialUpdateDanhMucLoaiDuongSu): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucLoaiDuongSu>(
      `${this.resourceUrl}/${this.getDanhMucLoaiDuongSuIdentifier(danhMucLoaiDuongSu)}`,
      danhMucLoaiDuongSu,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucLoaiDuongSu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucLoaiDuongSu[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucLoaiDuongSuIdentifier(danhMucLoaiDuongSu: Pick<IDanhMucLoaiDuongSu, 'id'>): number {
    return danhMucLoaiDuongSu.id;
  }

  compareDanhMucLoaiDuongSu(o1: Pick<IDanhMucLoaiDuongSu, 'id'> | null, o2: Pick<IDanhMucLoaiDuongSu, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucLoaiDuongSuIdentifier(o1) === this.getDanhMucLoaiDuongSuIdentifier(o2) : o1 === o2;
  }

  addDanhMucLoaiDuongSuToCollectionIfMissing<Type extends Pick<IDanhMucLoaiDuongSu, 'id'>>(
    danhMucLoaiDuongSuCollection: Type[],
    ...danhMucLoaiDuongSusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucLoaiDuongSus: Type[] = danhMucLoaiDuongSusToCheck.filter(isPresent);
    if (danhMucLoaiDuongSus.length > 0) {
      const danhMucLoaiDuongSuCollectionIdentifiers = danhMucLoaiDuongSuCollection.map(danhMucLoaiDuongSuItem =>
        this.getDanhMucLoaiDuongSuIdentifier(danhMucLoaiDuongSuItem),
      );
      const danhMucLoaiDuongSusToAdd = danhMucLoaiDuongSus.filter(danhMucLoaiDuongSuItem => {
        const danhMucLoaiDuongSuIdentifier = this.getDanhMucLoaiDuongSuIdentifier(danhMucLoaiDuongSuItem);
        if (danhMucLoaiDuongSuCollectionIdentifiers.includes(danhMucLoaiDuongSuIdentifier)) {
          return false;
        }
        danhMucLoaiDuongSuCollectionIdentifiers.push(danhMucLoaiDuongSuIdentifier);
        return true;
      });
      return [...danhMucLoaiDuongSusToAdd, ...danhMucLoaiDuongSuCollection];
    }
    return danhMucLoaiDuongSuCollection;
  }
}
