import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucLoaiTaiSan, NewDanhMucLoaiTaiSan } from '../danh-muc-loai-tai-san.model';

export type PartialUpdateDanhMucLoaiTaiSan = Partial<IDanhMucLoaiTaiSan> & Pick<IDanhMucLoaiTaiSan, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucLoaiTaiSan>;
export type EntityArrayResponseType = HttpResponse<IDanhMucLoaiTaiSan[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiTaiSanService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-loai-tai-sans');

  create(danhMucLoaiTaiSan: NewDanhMucLoaiTaiSan): Observable<EntityResponseType> {
    return this.http.post<IDanhMucLoaiTaiSan>(this.resourceUrl, danhMucLoaiTaiSan, { observe: 'response' });
  }

  update(danhMucLoaiTaiSan: IDanhMucLoaiTaiSan): Observable<EntityResponseType> {
    return this.http.put<IDanhMucLoaiTaiSan>(
      `${this.resourceUrl}/${this.getDanhMucLoaiTaiSanIdentifier(danhMucLoaiTaiSan)}`,
      danhMucLoaiTaiSan,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucLoaiTaiSan: PartialUpdateDanhMucLoaiTaiSan): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucLoaiTaiSan>(
      `${this.resourceUrl}/${this.getDanhMucLoaiTaiSanIdentifier(danhMucLoaiTaiSan)}`,
      danhMucLoaiTaiSan,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucLoaiTaiSan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucLoaiTaiSan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucLoaiTaiSanIdentifier(danhMucLoaiTaiSan: Pick<IDanhMucLoaiTaiSan, 'id'>): number {
    return danhMucLoaiTaiSan.id;
  }

  compareDanhMucLoaiTaiSan(o1: Pick<IDanhMucLoaiTaiSan, 'id'> | null, o2: Pick<IDanhMucLoaiTaiSan, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucLoaiTaiSanIdentifier(o1) === this.getDanhMucLoaiTaiSanIdentifier(o2) : o1 === o2;
  }

  addDanhMucLoaiTaiSanToCollectionIfMissing<Type extends Pick<IDanhMucLoaiTaiSan, 'id'>>(
    danhMucLoaiTaiSanCollection: Type[],
    ...danhMucLoaiTaiSansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucLoaiTaiSans: Type[] = danhMucLoaiTaiSansToCheck.filter(isPresent);
    if (danhMucLoaiTaiSans.length > 0) {
      const danhMucLoaiTaiSanCollectionIdentifiers = danhMucLoaiTaiSanCollection.map(danhMucLoaiTaiSanItem =>
        this.getDanhMucLoaiTaiSanIdentifier(danhMucLoaiTaiSanItem),
      );
      const danhMucLoaiTaiSansToAdd = danhMucLoaiTaiSans.filter(danhMucLoaiTaiSanItem => {
        const danhMucLoaiTaiSanIdentifier = this.getDanhMucLoaiTaiSanIdentifier(danhMucLoaiTaiSanItem);
        if (danhMucLoaiTaiSanCollectionIdentifiers.includes(danhMucLoaiTaiSanIdentifier)) {
          return false;
        }
        danhMucLoaiTaiSanCollectionIdentifiers.push(danhMucLoaiTaiSanIdentifier);
        return true;
      });
      return [...danhMucLoaiTaiSansToAdd, ...danhMucLoaiTaiSanCollection];
    }
    return danhMucLoaiTaiSanCollection;
  }
}
