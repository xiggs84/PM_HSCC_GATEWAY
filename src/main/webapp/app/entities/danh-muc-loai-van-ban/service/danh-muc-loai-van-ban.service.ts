import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucLoaiVanBan, NewDanhMucLoaiVanBan } from '../danh-muc-loai-van-ban.model';

export type PartialUpdateDanhMucLoaiVanBan = Partial<IDanhMucLoaiVanBan> & Pick<IDanhMucLoaiVanBan, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucLoaiVanBan>;
export type EntityArrayResponseType = HttpResponse<IDanhMucLoaiVanBan[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiVanBanService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-loai-van-bans');

  create(danhMucLoaiVanBan: NewDanhMucLoaiVanBan): Observable<EntityResponseType> {
    return this.http.post<IDanhMucLoaiVanBan>(this.resourceUrl, danhMucLoaiVanBan, { observe: 'response' });
  }

  update(danhMucLoaiVanBan: IDanhMucLoaiVanBan): Observable<EntityResponseType> {
    return this.http.put<IDanhMucLoaiVanBan>(
      `${this.resourceUrl}/${this.getDanhMucLoaiVanBanIdentifier(danhMucLoaiVanBan)}`,
      danhMucLoaiVanBan,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucLoaiVanBan: PartialUpdateDanhMucLoaiVanBan): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucLoaiVanBan>(
      `${this.resourceUrl}/${this.getDanhMucLoaiVanBanIdentifier(danhMucLoaiVanBan)}`,
      danhMucLoaiVanBan,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucLoaiVanBan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucLoaiVanBan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucLoaiVanBanIdentifier(danhMucLoaiVanBan: Pick<IDanhMucLoaiVanBan, 'id'>): number {
    return danhMucLoaiVanBan.id;
  }

  compareDanhMucLoaiVanBan(o1: Pick<IDanhMucLoaiVanBan, 'id'> | null, o2: Pick<IDanhMucLoaiVanBan, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucLoaiVanBanIdentifier(o1) === this.getDanhMucLoaiVanBanIdentifier(o2) : o1 === o2;
  }

  addDanhMucLoaiVanBanToCollectionIfMissing<Type extends Pick<IDanhMucLoaiVanBan, 'id'>>(
    danhMucLoaiVanBanCollection: Type[],
    ...danhMucLoaiVanBansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucLoaiVanBans: Type[] = danhMucLoaiVanBansToCheck.filter(isPresent);
    if (danhMucLoaiVanBans.length > 0) {
      const danhMucLoaiVanBanCollectionIdentifiers = danhMucLoaiVanBanCollection.map(danhMucLoaiVanBanItem =>
        this.getDanhMucLoaiVanBanIdentifier(danhMucLoaiVanBanItem),
      );
      const danhMucLoaiVanBansToAdd = danhMucLoaiVanBans.filter(danhMucLoaiVanBanItem => {
        const danhMucLoaiVanBanIdentifier = this.getDanhMucLoaiVanBanIdentifier(danhMucLoaiVanBanItem);
        if (danhMucLoaiVanBanCollectionIdentifiers.includes(danhMucLoaiVanBanIdentifier)) {
          return false;
        }
        danhMucLoaiVanBanCollectionIdentifiers.push(danhMucLoaiVanBanIdentifier);
        return true;
      });
      return [...danhMucLoaiVanBansToAdd, ...danhMucLoaiVanBanCollection];
    }
    return danhMucLoaiVanBanCollection;
  }
}
