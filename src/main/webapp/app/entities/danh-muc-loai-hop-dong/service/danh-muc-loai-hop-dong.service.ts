import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucLoaiHopDong, NewDanhMucLoaiHopDong } from '../danh-muc-loai-hop-dong.model';

export type PartialUpdateDanhMucLoaiHopDong = Partial<IDanhMucLoaiHopDong> & Pick<IDanhMucLoaiHopDong, 'id'>;

type RestOf<T extends IDanhMucLoaiHopDong | NewDanhMucLoaiHopDong> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestDanhMucLoaiHopDong = RestOf<IDanhMucLoaiHopDong>;

export type NewRestDanhMucLoaiHopDong = RestOf<NewDanhMucLoaiHopDong>;

export type PartialUpdateRestDanhMucLoaiHopDong = RestOf<PartialUpdateDanhMucLoaiHopDong>;

export type EntityResponseType = HttpResponse<IDanhMucLoaiHopDong>;
export type EntityArrayResponseType = HttpResponse<IDanhMucLoaiHopDong[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiHopDongService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-loai-hop-dongs');

  create(danhMucLoaiHopDong: NewDanhMucLoaiHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucLoaiHopDong);
    return this.http
      .post<RestDanhMucLoaiHopDong>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(danhMucLoaiHopDong: IDanhMucLoaiHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucLoaiHopDong);
    return this.http
      .put<RestDanhMucLoaiHopDong>(`${this.resourceUrl}/${this.getDanhMucLoaiHopDongIdentifier(danhMucLoaiHopDong)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(danhMucLoaiHopDong: PartialUpdateDanhMucLoaiHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucLoaiHopDong);
    return this.http
      .patch<RestDanhMucLoaiHopDong>(`${this.resourceUrl}/${this.getDanhMucLoaiHopDongIdentifier(danhMucLoaiHopDong)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDanhMucLoaiHopDong>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDanhMucLoaiHopDong[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucLoaiHopDongIdentifier(danhMucLoaiHopDong: Pick<IDanhMucLoaiHopDong, 'id'>): number {
    return danhMucLoaiHopDong.id;
  }

  compareDanhMucLoaiHopDong(o1: Pick<IDanhMucLoaiHopDong, 'id'> | null, o2: Pick<IDanhMucLoaiHopDong, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucLoaiHopDongIdentifier(o1) === this.getDanhMucLoaiHopDongIdentifier(o2) : o1 === o2;
  }

  addDanhMucLoaiHopDongToCollectionIfMissing<Type extends Pick<IDanhMucLoaiHopDong, 'id'>>(
    danhMucLoaiHopDongCollection: Type[],
    ...danhMucLoaiHopDongsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucLoaiHopDongs: Type[] = danhMucLoaiHopDongsToCheck.filter(isPresent);
    if (danhMucLoaiHopDongs.length > 0) {
      const danhMucLoaiHopDongCollectionIdentifiers = danhMucLoaiHopDongCollection.map(danhMucLoaiHopDongItem =>
        this.getDanhMucLoaiHopDongIdentifier(danhMucLoaiHopDongItem),
      );
      const danhMucLoaiHopDongsToAdd = danhMucLoaiHopDongs.filter(danhMucLoaiHopDongItem => {
        const danhMucLoaiHopDongIdentifier = this.getDanhMucLoaiHopDongIdentifier(danhMucLoaiHopDongItem);
        if (danhMucLoaiHopDongCollectionIdentifiers.includes(danhMucLoaiHopDongIdentifier)) {
          return false;
        }
        danhMucLoaiHopDongCollectionIdentifiers.push(danhMucLoaiHopDongIdentifier);
        return true;
      });
      return [...danhMucLoaiHopDongsToAdd, ...danhMucLoaiHopDongCollection];
    }
    return danhMucLoaiHopDongCollection;
  }

  protected convertDateFromClient<T extends IDanhMucLoaiHopDong | NewDanhMucLoaiHopDong | PartialUpdateDanhMucLoaiHopDong>(
    danhMucLoaiHopDong: T,
  ): RestOf<T> {
    return {
      ...danhMucLoaiHopDong,
      ngayThaoTac: danhMucLoaiHopDong.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDanhMucLoaiHopDong: RestDanhMucLoaiHopDong): IDanhMucLoaiHopDong {
    return {
      ...restDanhMucLoaiHopDong,
      ngayThaoTac: restDanhMucLoaiHopDong.ngayThaoTac ? dayjs(restDanhMucLoaiHopDong.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDanhMucLoaiHopDong>): HttpResponse<IDanhMucLoaiHopDong> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDanhMucLoaiHopDong[]>): HttpResponse<IDanhMucLoaiHopDong[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
