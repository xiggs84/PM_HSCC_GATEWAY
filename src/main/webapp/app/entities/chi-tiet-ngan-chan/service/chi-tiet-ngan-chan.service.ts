import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChiTietNganChan, NewChiTietNganChan } from '../chi-tiet-ngan-chan.model';

export type PartialUpdateChiTietNganChan = Partial<IChiTietNganChan> & Pick<IChiTietNganChan, 'id'>;

type RestOf<T extends IChiTietNganChan | NewChiTietNganChan> = Omit<
  T,
  'ngayThaoTac' | 'ngayNganChan' | 'ngayBdNganChan' | 'ngayKtNganChan' | 'ngayCongVan'
> & {
  ngayThaoTac?: string | null;
  ngayNganChan?: string | null;
  ngayBdNganChan?: string | null;
  ngayKtNganChan?: string | null;
  ngayCongVan?: string | null;
};

export type RestChiTietNganChan = RestOf<IChiTietNganChan>;

export type NewRestChiTietNganChan = RestOf<NewChiTietNganChan>;

export type PartialUpdateRestChiTietNganChan = RestOf<PartialUpdateChiTietNganChan>;

export type EntityResponseType = HttpResponse<IChiTietNganChan>;
export type EntityArrayResponseType = HttpResponse<IChiTietNganChan[]>;

@Injectable({ providedIn: 'root' })
export class ChiTietNganChanService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/chi-tiet-ngan-chans');

  create(chiTietNganChan: NewChiTietNganChan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chiTietNganChan);
    return this.http
      .post<RestChiTietNganChan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(chiTietNganChan: IChiTietNganChan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chiTietNganChan);
    return this.http
      .put<RestChiTietNganChan>(`${this.resourceUrl}/${this.getChiTietNganChanIdentifier(chiTietNganChan)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(chiTietNganChan: PartialUpdateChiTietNganChan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chiTietNganChan);
    return this.http
      .patch<RestChiTietNganChan>(`${this.resourceUrl}/${this.getChiTietNganChanIdentifier(chiTietNganChan)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestChiTietNganChan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestChiTietNganChan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getChiTietNganChanIdentifier(chiTietNganChan: Pick<IChiTietNganChan, 'id'>): number {
    return chiTietNganChan.id;
  }

  compareChiTietNganChan(o1: Pick<IChiTietNganChan, 'id'> | null, o2: Pick<IChiTietNganChan, 'id'> | null): boolean {
    return o1 && o2 ? this.getChiTietNganChanIdentifier(o1) === this.getChiTietNganChanIdentifier(o2) : o1 === o2;
  }

  addChiTietNganChanToCollectionIfMissing<Type extends Pick<IChiTietNganChan, 'id'>>(
    chiTietNganChanCollection: Type[],
    ...chiTietNganChansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const chiTietNganChans: Type[] = chiTietNganChansToCheck.filter(isPresent);
    if (chiTietNganChans.length > 0) {
      const chiTietNganChanCollectionIdentifiers = chiTietNganChanCollection.map(chiTietNganChanItem =>
        this.getChiTietNganChanIdentifier(chiTietNganChanItem),
      );
      const chiTietNganChansToAdd = chiTietNganChans.filter(chiTietNganChanItem => {
        const chiTietNganChanIdentifier = this.getChiTietNganChanIdentifier(chiTietNganChanItem);
        if (chiTietNganChanCollectionIdentifiers.includes(chiTietNganChanIdentifier)) {
          return false;
        }
        chiTietNganChanCollectionIdentifiers.push(chiTietNganChanIdentifier);
        return true;
      });
      return [...chiTietNganChansToAdd, ...chiTietNganChanCollection];
    }
    return chiTietNganChanCollection;
  }

  protected convertDateFromClient<T extends IChiTietNganChan | NewChiTietNganChan | PartialUpdateChiTietNganChan>(
    chiTietNganChan: T,
  ): RestOf<T> {
    return {
      ...chiTietNganChan,
      ngayThaoTac: chiTietNganChan.ngayThaoTac?.format(DATE_FORMAT) ?? null,
      ngayNganChan: chiTietNganChan.ngayNganChan?.format(DATE_FORMAT) ?? null,
      ngayBdNganChan: chiTietNganChan.ngayBdNganChan?.format(DATE_FORMAT) ?? null,
      ngayKtNganChan: chiTietNganChan.ngayKtNganChan?.format(DATE_FORMAT) ?? null,
      ngayCongVan: chiTietNganChan.ngayCongVan?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restChiTietNganChan: RestChiTietNganChan): IChiTietNganChan {
    return {
      ...restChiTietNganChan,
      ngayThaoTac: restChiTietNganChan.ngayThaoTac ? dayjs(restChiTietNganChan.ngayThaoTac) : undefined,
      ngayNganChan: restChiTietNganChan.ngayNganChan ? dayjs(restChiTietNganChan.ngayNganChan) : undefined,
      ngayBdNganChan: restChiTietNganChan.ngayBdNganChan ? dayjs(restChiTietNganChan.ngayBdNganChan) : undefined,
      ngayKtNganChan: restChiTietNganChan.ngayKtNganChan ? dayjs(restChiTietNganChan.ngayKtNganChan) : undefined,
      ngayCongVan: restChiTietNganChan.ngayCongVan ? dayjs(restChiTietNganChan.ngayCongVan) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestChiTietNganChan>): HttpResponse<IChiTietNganChan> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestChiTietNganChan[]>): HttpResponse<IChiTietNganChan[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
