import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucTinhTrangHonNhan, NewDanhMucTinhTrangHonNhan } from '../danh-muc-tinh-trang-hon-nhan.model';

export type PartialUpdateDanhMucTinhTrangHonNhan = Partial<IDanhMucTinhTrangHonNhan> & Pick<IDanhMucTinhTrangHonNhan, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucTinhTrangHonNhan>;
export type EntityArrayResponseType = HttpResponse<IDanhMucTinhTrangHonNhan[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucTinhTrangHonNhanService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-tinh-trang-hon-nhans');

  create(danhMucTinhTrangHonNhan: NewDanhMucTinhTrangHonNhan): Observable<EntityResponseType> {
    return this.http.post<IDanhMucTinhTrangHonNhan>(this.resourceUrl, danhMucTinhTrangHonNhan, { observe: 'response' });
  }

  update(danhMucTinhTrangHonNhan: IDanhMucTinhTrangHonNhan): Observable<EntityResponseType> {
    return this.http.put<IDanhMucTinhTrangHonNhan>(
      `${this.resourceUrl}/${this.getDanhMucTinhTrangHonNhanIdentifier(danhMucTinhTrangHonNhan)}`,
      danhMucTinhTrangHonNhan,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucTinhTrangHonNhan: PartialUpdateDanhMucTinhTrangHonNhan): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucTinhTrangHonNhan>(
      `${this.resourceUrl}/${this.getDanhMucTinhTrangHonNhanIdentifier(danhMucTinhTrangHonNhan)}`,
      danhMucTinhTrangHonNhan,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucTinhTrangHonNhan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucTinhTrangHonNhan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucTinhTrangHonNhanIdentifier(danhMucTinhTrangHonNhan: Pick<IDanhMucTinhTrangHonNhan, 'id'>): number {
    return danhMucTinhTrangHonNhan.id;
  }

  compareDanhMucTinhTrangHonNhan(
    o1: Pick<IDanhMucTinhTrangHonNhan, 'id'> | null,
    o2: Pick<IDanhMucTinhTrangHonNhan, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getDanhMucTinhTrangHonNhanIdentifier(o1) === this.getDanhMucTinhTrangHonNhanIdentifier(o2) : o1 === o2;
  }

  addDanhMucTinhTrangHonNhanToCollectionIfMissing<Type extends Pick<IDanhMucTinhTrangHonNhan, 'id'>>(
    danhMucTinhTrangHonNhanCollection: Type[],
    ...danhMucTinhTrangHonNhansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucTinhTrangHonNhans: Type[] = danhMucTinhTrangHonNhansToCheck.filter(isPresent);
    if (danhMucTinhTrangHonNhans.length > 0) {
      const danhMucTinhTrangHonNhanCollectionIdentifiers = danhMucTinhTrangHonNhanCollection.map(danhMucTinhTrangHonNhanItem =>
        this.getDanhMucTinhTrangHonNhanIdentifier(danhMucTinhTrangHonNhanItem),
      );
      const danhMucTinhTrangHonNhansToAdd = danhMucTinhTrangHonNhans.filter(danhMucTinhTrangHonNhanItem => {
        const danhMucTinhTrangHonNhanIdentifier = this.getDanhMucTinhTrangHonNhanIdentifier(danhMucTinhTrangHonNhanItem);
        if (danhMucTinhTrangHonNhanCollectionIdentifiers.includes(danhMucTinhTrangHonNhanIdentifier)) {
          return false;
        }
        danhMucTinhTrangHonNhanCollectionIdentifiers.push(danhMucTinhTrangHonNhanIdentifier);
        return true;
      });
      return [...danhMucTinhTrangHonNhansToAdd, ...danhMucTinhTrangHonNhanCollection];
    }
    return danhMucTinhTrangHonNhanCollection;
  }
}
