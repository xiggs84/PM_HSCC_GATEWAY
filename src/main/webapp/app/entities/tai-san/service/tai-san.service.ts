import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaiSan, NewTaiSan } from '../tai-san.model';

export type PartialUpdateTaiSan = Partial<ITaiSan> & Pick<ITaiSan, 'id'>;

type RestOf<T extends ITaiSan | NewTaiSan> = Omit<T, 'ngayThaoTac' | 'ngayBdNganChan' | 'ngayKtNganChan'> & {
  ngayThaoTac?: string | null;
  ngayBdNganChan?: string | null;
  ngayKtNganChan?: string | null;
};

export type RestTaiSan = RestOf<ITaiSan>;

export type NewRestTaiSan = RestOf<NewTaiSan>;

export type PartialUpdateRestTaiSan = RestOf<PartialUpdateTaiSan>;

export type EntityResponseType = HttpResponse<ITaiSan>;
export type EntityArrayResponseType = HttpResponse<ITaiSan[]>;

@Injectable({ providedIn: 'root' })
export class TaiSanService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tai-sans');

  create(taiSan: NewTaiSan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taiSan);
    return this.http
      .post<RestTaiSan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(taiSan: ITaiSan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taiSan);
    return this.http
      .put<RestTaiSan>(`${this.resourceUrl}/${this.getTaiSanIdentifier(taiSan)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(taiSan: PartialUpdateTaiSan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taiSan);
    return this.http
      .patch<RestTaiSan>(`${this.resourceUrl}/${this.getTaiSanIdentifier(taiSan)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTaiSan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTaiSan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTaiSanIdentifier(taiSan: Pick<ITaiSan, 'id'>): number {
    return taiSan.id;
  }

  compareTaiSan(o1: Pick<ITaiSan, 'id'> | null, o2: Pick<ITaiSan, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaiSanIdentifier(o1) === this.getTaiSanIdentifier(o2) : o1 === o2;
  }

  addTaiSanToCollectionIfMissing<Type extends Pick<ITaiSan, 'id'>>(
    taiSanCollection: Type[],
    ...taiSansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taiSans: Type[] = taiSansToCheck.filter(isPresent);
    if (taiSans.length > 0) {
      const taiSanCollectionIdentifiers = taiSanCollection.map(taiSanItem => this.getTaiSanIdentifier(taiSanItem));
      const taiSansToAdd = taiSans.filter(taiSanItem => {
        const taiSanIdentifier = this.getTaiSanIdentifier(taiSanItem);
        if (taiSanCollectionIdentifiers.includes(taiSanIdentifier)) {
          return false;
        }
        taiSanCollectionIdentifiers.push(taiSanIdentifier);
        return true;
      });
      return [...taiSansToAdd, ...taiSanCollection];
    }
    return taiSanCollection;
  }

  protected convertDateFromClient<T extends ITaiSan | NewTaiSan | PartialUpdateTaiSan>(taiSan: T): RestOf<T> {
    return {
      ...taiSan,
      ngayThaoTac: taiSan.ngayThaoTac?.format(DATE_FORMAT) ?? null,
      ngayBdNganChan: taiSan.ngayBdNganChan?.format(DATE_FORMAT) ?? null,
      ngayKtNganChan: taiSan.ngayKtNganChan?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restTaiSan: RestTaiSan): ITaiSan {
    return {
      ...restTaiSan,
      ngayThaoTac: restTaiSan.ngayThaoTac ? dayjs(restTaiSan.ngayThaoTac) : undefined,
      ngayBdNganChan: restTaiSan.ngayBdNganChan ? dayjs(restTaiSan.ngayBdNganChan) : undefined,
      ngayKtNganChan: restTaiSan.ngayKtNganChan ? dayjs(restTaiSan.ngayKtNganChan) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTaiSan>): HttpResponse<ITaiSan> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTaiSan[]>): HttpResponse<ITaiSan[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
