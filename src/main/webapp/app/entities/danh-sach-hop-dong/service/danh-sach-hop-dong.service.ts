import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhSachHopDong, NewDanhSachHopDong } from '../danh-sach-hop-dong.model';

export type PartialUpdateDanhSachHopDong = Partial<IDanhSachHopDong> & Pick<IDanhSachHopDong, 'id'>;

type RestOf<T extends IDanhSachHopDong | NewDanhSachHopDong> = Omit<T, 'ngayLapHd' | 'ngayThaoTac' | 'ngayThaoTacRutTrich'> & {
  ngayLapHd?: string | null;
  ngayThaoTac?: string | null;
  ngayThaoTacRutTrich?: string | null;
};

export type RestDanhSachHopDong = RestOf<IDanhSachHopDong>;

export type NewRestDanhSachHopDong = RestOf<NewDanhSachHopDong>;

export type PartialUpdateRestDanhSachHopDong = RestOf<PartialUpdateDanhSachHopDong>;

export type EntityResponseType = HttpResponse<IDanhSachHopDong>;
export type EntityArrayResponseType = HttpResponse<IDanhSachHopDong[]>;

@Injectable({ providedIn: 'root' })
export class DanhSachHopDongService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-sach-hop-dongs');

  create(danhSachHopDong: NewDanhSachHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhSachHopDong);
    return this.http
      .post<RestDanhSachHopDong>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(danhSachHopDong: IDanhSachHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhSachHopDong);
    return this.http
      .put<RestDanhSachHopDong>(`${this.resourceUrl}/${this.getDanhSachHopDongIdentifier(danhSachHopDong)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(danhSachHopDong: PartialUpdateDanhSachHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhSachHopDong);
    return this.http
      .patch<RestDanhSachHopDong>(`${this.resourceUrl}/${this.getDanhSachHopDongIdentifier(danhSachHopDong)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDanhSachHopDong>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDanhSachHopDong[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhSachHopDongIdentifier(danhSachHopDong: Pick<IDanhSachHopDong, 'id'>): number {
    return danhSachHopDong.id;
  }

  compareDanhSachHopDong(o1: Pick<IDanhSachHopDong, 'id'> | null, o2: Pick<IDanhSachHopDong, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhSachHopDongIdentifier(o1) === this.getDanhSachHopDongIdentifier(o2) : o1 === o2;
  }

  addDanhSachHopDongToCollectionIfMissing<Type extends Pick<IDanhSachHopDong, 'id'>>(
    danhSachHopDongCollection: Type[],
    ...danhSachHopDongsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhSachHopDongs: Type[] = danhSachHopDongsToCheck.filter(isPresent);
    if (danhSachHopDongs.length > 0) {
      const danhSachHopDongCollectionIdentifiers = danhSachHopDongCollection.map(danhSachHopDongItem =>
        this.getDanhSachHopDongIdentifier(danhSachHopDongItem),
      );
      const danhSachHopDongsToAdd = danhSachHopDongs.filter(danhSachHopDongItem => {
        const danhSachHopDongIdentifier = this.getDanhSachHopDongIdentifier(danhSachHopDongItem);
        if (danhSachHopDongCollectionIdentifiers.includes(danhSachHopDongIdentifier)) {
          return false;
        }
        danhSachHopDongCollectionIdentifiers.push(danhSachHopDongIdentifier);
        return true;
      });
      return [...danhSachHopDongsToAdd, ...danhSachHopDongCollection];
    }
    return danhSachHopDongCollection;
  }

  protected convertDateFromClient<T extends IDanhSachHopDong | NewDanhSachHopDong | PartialUpdateDanhSachHopDong>(
    danhSachHopDong: T,
  ): RestOf<T> {
    return {
      ...danhSachHopDong,
      ngayLapHd: danhSachHopDong.ngayLapHd?.format(DATE_FORMAT) ?? null,
      ngayThaoTac: danhSachHopDong.ngayThaoTac?.format(DATE_FORMAT) ?? null,
      ngayThaoTacRutTrich: danhSachHopDong.ngayThaoTacRutTrich?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDanhSachHopDong: RestDanhSachHopDong): IDanhSachHopDong {
    return {
      ...restDanhSachHopDong,
      ngayLapHd: restDanhSachHopDong.ngayLapHd ? dayjs(restDanhSachHopDong.ngayLapHd) : undefined,
      ngayThaoTac: restDanhSachHopDong.ngayThaoTac ? dayjs(restDanhSachHopDong.ngayThaoTac) : undefined,
      ngayThaoTacRutTrich: restDanhSachHopDong.ngayThaoTacRutTrich ? dayjs(restDanhSachHopDong.ngayThaoTacRutTrich) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDanhSachHopDong>): HttpResponse<IDanhSachHopDong> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDanhSachHopDong[]>): HttpResponse<IDanhSachHopDong[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
