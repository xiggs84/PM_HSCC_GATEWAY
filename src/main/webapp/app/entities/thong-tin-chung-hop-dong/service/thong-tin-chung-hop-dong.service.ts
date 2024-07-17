import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IThongTinChungHopDong, NewThongTinChungHopDong } from '../thong-tin-chung-hop-dong.model';

export type PartialUpdateThongTinChungHopDong = Partial<IThongTinChungHopDong> & Pick<IThongTinChungHopDong, 'id'>;

type RestOf<T extends IThongTinChungHopDong | NewThongTinChungHopDong> = Omit<
  T,
  'ngayLapHd' | 'ngayThaoTac' | 'ngayHen' | 'ngayKyHd' | 'ngayRutTrich'
> & {
  ngayLapHd?: string | null;
  ngayThaoTac?: string | null;
  ngayHen?: string | null;
  ngayKyHd?: string | null;
  ngayRutTrich?: string | null;
};

export type RestThongTinChungHopDong = RestOf<IThongTinChungHopDong>;

export type NewRestThongTinChungHopDong = RestOf<NewThongTinChungHopDong>;

export type PartialUpdateRestThongTinChungHopDong = RestOf<PartialUpdateThongTinChungHopDong>;

export type EntityResponseType = HttpResponse<IThongTinChungHopDong>;
export type EntityArrayResponseType = HttpResponse<IThongTinChungHopDong[]>;

@Injectable({ providedIn: 'root' })
export class ThongTinChungHopDongService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/thong-tin-chung-hop-dongs');

  create(thongTinChungHopDong: NewThongTinChungHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thongTinChungHopDong);
    return this.http
      .post<RestThongTinChungHopDong>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(thongTinChungHopDong: IThongTinChungHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thongTinChungHopDong);
    return this.http
      .put<RestThongTinChungHopDong>(`${this.resourceUrl}/${this.getThongTinChungHopDongIdentifier(thongTinChungHopDong)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(thongTinChungHopDong: PartialUpdateThongTinChungHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thongTinChungHopDong);
    return this.http
      .patch<RestThongTinChungHopDong>(`${this.resourceUrl}/${this.getThongTinChungHopDongIdentifier(thongTinChungHopDong)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestThongTinChungHopDong>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestThongTinChungHopDong[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getThongTinChungHopDongIdentifier(thongTinChungHopDong: Pick<IThongTinChungHopDong, 'id'>): number {
    return thongTinChungHopDong.id;
  }

  compareThongTinChungHopDong(o1: Pick<IThongTinChungHopDong, 'id'> | null, o2: Pick<IThongTinChungHopDong, 'id'> | null): boolean {
    return o1 && o2 ? this.getThongTinChungHopDongIdentifier(o1) === this.getThongTinChungHopDongIdentifier(o2) : o1 === o2;
  }

  addThongTinChungHopDongToCollectionIfMissing<Type extends Pick<IThongTinChungHopDong, 'id'>>(
    thongTinChungHopDongCollection: Type[],
    ...thongTinChungHopDongsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const thongTinChungHopDongs: Type[] = thongTinChungHopDongsToCheck.filter(isPresent);
    if (thongTinChungHopDongs.length > 0) {
      const thongTinChungHopDongCollectionIdentifiers = thongTinChungHopDongCollection.map(thongTinChungHopDongItem =>
        this.getThongTinChungHopDongIdentifier(thongTinChungHopDongItem),
      );
      const thongTinChungHopDongsToAdd = thongTinChungHopDongs.filter(thongTinChungHopDongItem => {
        const thongTinChungHopDongIdentifier = this.getThongTinChungHopDongIdentifier(thongTinChungHopDongItem);
        if (thongTinChungHopDongCollectionIdentifiers.includes(thongTinChungHopDongIdentifier)) {
          return false;
        }
        thongTinChungHopDongCollectionIdentifiers.push(thongTinChungHopDongIdentifier);
        return true;
      });
      return [...thongTinChungHopDongsToAdd, ...thongTinChungHopDongCollection];
    }
    return thongTinChungHopDongCollection;
  }

  protected convertDateFromClient<T extends IThongTinChungHopDong | NewThongTinChungHopDong | PartialUpdateThongTinChungHopDong>(
    thongTinChungHopDong: T,
  ): RestOf<T> {
    return {
      ...thongTinChungHopDong,
      ngayLapHd: thongTinChungHopDong.ngayLapHd?.format(DATE_FORMAT) ?? null,
      ngayThaoTac: thongTinChungHopDong.ngayThaoTac?.format(DATE_FORMAT) ?? null,
      ngayHen: thongTinChungHopDong.ngayHen?.format(DATE_FORMAT) ?? null,
      ngayKyHd: thongTinChungHopDong.ngayKyHd?.format(DATE_FORMAT) ?? null,
      ngayRutTrich: thongTinChungHopDong.ngayRutTrich?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restThongTinChungHopDong: RestThongTinChungHopDong): IThongTinChungHopDong {
    return {
      ...restThongTinChungHopDong,
      ngayLapHd: restThongTinChungHopDong.ngayLapHd ? dayjs(restThongTinChungHopDong.ngayLapHd) : undefined,
      ngayThaoTac: restThongTinChungHopDong.ngayThaoTac ? dayjs(restThongTinChungHopDong.ngayThaoTac) : undefined,
      ngayHen: restThongTinChungHopDong.ngayHen ? dayjs(restThongTinChungHopDong.ngayHen) : undefined,
      ngayKyHd: restThongTinChungHopDong.ngayKyHd ? dayjs(restThongTinChungHopDong.ngayKyHd) : undefined,
      ngayRutTrich: restThongTinChungHopDong.ngayRutTrich ? dayjs(restThongTinChungHopDong.ngayRutTrich) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestThongTinChungHopDong>): HttpResponse<IThongTinChungHopDong> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestThongTinChungHopDong[]>): HttpResponse<IThongTinChungHopDong[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
