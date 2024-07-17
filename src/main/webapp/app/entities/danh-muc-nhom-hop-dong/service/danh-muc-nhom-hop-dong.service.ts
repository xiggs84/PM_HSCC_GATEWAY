import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucNhomHopDong, NewDanhMucNhomHopDong } from '../danh-muc-nhom-hop-dong.model';

export type PartialUpdateDanhMucNhomHopDong = Partial<IDanhMucNhomHopDong> & Pick<IDanhMucNhomHopDong, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucNhomHopDong>;
export type EntityArrayResponseType = HttpResponse<IDanhMucNhomHopDong[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucNhomHopDongService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-nhom-hop-dongs');

  create(danhMucNhomHopDong: NewDanhMucNhomHopDong): Observable<EntityResponseType> {
    return this.http.post<IDanhMucNhomHopDong>(this.resourceUrl, danhMucNhomHopDong, { observe: 'response' });
  }

  update(danhMucNhomHopDong: IDanhMucNhomHopDong): Observable<EntityResponseType> {
    return this.http.put<IDanhMucNhomHopDong>(
      `${this.resourceUrl}/${this.getDanhMucNhomHopDongIdentifier(danhMucNhomHopDong)}`,
      danhMucNhomHopDong,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucNhomHopDong: PartialUpdateDanhMucNhomHopDong): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucNhomHopDong>(
      `${this.resourceUrl}/${this.getDanhMucNhomHopDongIdentifier(danhMucNhomHopDong)}`,
      danhMucNhomHopDong,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucNhomHopDong>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucNhomHopDong[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucNhomHopDongIdentifier(danhMucNhomHopDong: Pick<IDanhMucNhomHopDong, 'id'>): number {
    return danhMucNhomHopDong.id;
  }

  compareDanhMucNhomHopDong(o1: Pick<IDanhMucNhomHopDong, 'id'> | null, o2: Pick<IDanhMucNhomHopDong, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucNhomHopDongIdentifier(o1) === this.getDanhMucNhomHopDongIdentifier(o2) : o1 === o2;
  }

  addDanhMucNhomHopDongToCollectionIfMissing<Type extends Pick<IDanhMucNhomHopDong, 'id'>>(
    danhMucNhomHopDongCollection: Type[],
    ...danhMucNhomHopDongsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucNhomHopDongs: Type[] = danhMucNhomHopDongsToCheck.filter(isPresent);
    if (danhMucNhomHopDongs.length > 0) {
      const danhMucNhomHopDongCollectionIdentifiers = danhMucNhomHopDongCollection.map(danhMucNhomHopDongItem =>
        this.getDanhMucNhomHopDongIdentifier(danhMucNhomHopDongItem),
      );
      const danhMucNhomHopDongsToAdd = danhMucNhomHopDongs.filter(danhMucNhomHopDongItem => {
        const danhMucNhomHopDongIdentifier = this.getDanhMucNhomHopDongIdentifier(danhMucNhomHopDongItem);
        if (danhMucNhomHopDongCollectionIdentifiers.includes(danhMucNhomHopDongIdentifier)) {
          return false;
        }
        danhMucNhomHopDongCollectionIdentifiers.push(danhMucNhomHopDongIdentifier);
        return true;
      });
      return [...danhMucNhomHopDongsToAdd, ...danhMucNhomHopDongCollection];
    }
    return danhMucNhomHopDongCollection;
  }
}
