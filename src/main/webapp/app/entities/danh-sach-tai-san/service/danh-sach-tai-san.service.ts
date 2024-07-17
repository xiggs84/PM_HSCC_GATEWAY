import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhSachTaiSan, NewDanhSachTaiSan } from '../danh-sach-tai-san.model';

export type PartialUpdateDanhSachTaiSan = Partial<IDanhSachTaiSan> & Pick<IDanhSachTaiSan, 'id'>;

type RestOf<T extends IDanhSachTaiSan | NewDanhSachTaiSan> = Omit<T, 'ngayThaoTac' | 'ngayBdNganChan' | 'ngayKtNganChan'> & {
  ngayThaoTac?: string | null;
  ngayBdNganChan?: string | null;
  ngayKtNganChan?: string | null;
};

export type RestDanhSachTaiSan = RestOf<IDanhSachTaiSan>;

export type NewRestDanhSachTaiSan = RestOf<NewDanhSachTaiSan>;

export type PartialUpdateRestDanhSachTaiSan = RestOf<PartialUpdateDanhSachTaiSan>;

export type EntityResponseType = HttpResponse<IDanhSachTaiSan>;
export type EntityArrayResponseType = HttpResponse<IDanhSachTaiSan[]>;

@Injectable({ providedIn: 'root' })
export class DanhSachTaiSanService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-sach-tai-sans');

  create(danhSachTaiSan: NewDanhSachTaiSan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhSachTaiSan);
    return this.http
      .post<RestDanhSachTaiSan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(danhSachTaiSan: IDanhSachTaiSan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhSachTaiSan);
    return this.http
      .put<RestDanhSachTaiSan>(`${this.resourceUrl}/${this.getDanhSachTaiSanIdentifier(danhSachTaiSan)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(danhSachTaiSan: PartialUpdateDanhSachTaiSan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhSachTaiSan);
    return this.http
      .patch<RestDanhSachTaiSan>(`${this.resourceUrl}/${this.getDanhSachTaiSanIdentifier(danhSachTaiSan)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDanhSachTaiSan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDanhSachTaiSan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhSachTaiSanIdentifier(danhSachTaiSan: Pick<IDanhSachTaiSan, 'id'>): number {
    return danhSachTaiSan.id;
  }

  compareDanhSachTaiSan(o1: Pick<IDanhSachTaiSan, 'id'> | null, o2: Pick<IDanhSachTaiSan, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhSachTaiSanIdentifier(o1) === this.getDanhSachTaiSanIdentifier(o2) : o1 === o2;
  }

  addDanhSachTaiSanToCollectionIfMissing<Type extends Pick<IDanhSachTaiSan, 'id'>>(
    danhSachTaiSanCollection: Type[],
    ...danhSachTaiSansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhSachTaiSans: Type[] = danhSachTaiSansToCheck.filter(isPresent);
    if (danhSachTaiSans.length > 0) {
      const danhSachTaiSanCollectionIdentifiers = danhSachTaiSanCollection.map(danhSachTaiSanItem =>
        this.getDanhSachTaiSanIdentifier(danhSachTaiSanItem),
      );
      const danhSachTaiSansToAdd = danhSachTaiSans.filter(danhSachTaiSanItem => {
        const danhSachTaiSanIdentifier = this.getDanhSachTaiSanIdentifier(danhSachTaiSanItem);
        if (danhSachTaiSanCollectionIdentifiers.includes(danhSachTaiSanIdentifier)) {
          return false;
        }
        danhSachTaiSanCollectionIdentifiers.push(danhSachTaiSanIdentifier);
        return true;
      });
      return [...danhSachTaiSansToAdd, ...danhSachTaiSanCollection];
    }
    return danhSachTaiSanCollection;
  }

  protected convertDateFromClient<T extends IDanhSachTaiSan | NewDanhSachTaiSan | PartialUpdateDanhSachTaiSan>(
    danhSachTaiSan: T,
  ): RestOf<T> {
    return {
      ...danhSachTaiSan,
      ngayThaoTac: danhSachTaiSan.ngayThaoTac?.format(DATE_FORMAT) ?? null,
      ngayBdNganChan: danhSachTaiSan.ngayBdNganChan?.format(DATE_FORMAT) ?? null,
      ngayKtNganChan: danhSachTaiSan.ngayKtNganChan?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDanhSachTaiSan: RestDanhSachTaiSan): IDanhSachTaiSan {
    return {
      ...restDanhSachTaiSan,
      ngayThaoTac: restDanhSachTaiSan.ngayThaoTac ? dayjs(restDanhSachTaiSan.ngayThaoTac) : undefined,
      ngayBdNganChan: restDanhSachTaiSan.ngayBdNganChan ? dayjs(restDanhSachTaiSan.ngayBdNganChan) : undefined,
      ngayKtNganChan: restDanhSachTaiSan.ngayKtNganChan ? dayjs(restDanhSachTaiSan.ngayKtNganChan) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDanhSachTaiSan>): HttpResponse<IDanhSachTaiSan> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDanhSachTaiSan[]>): HttpResponse<IDanhSachTaiSan[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
