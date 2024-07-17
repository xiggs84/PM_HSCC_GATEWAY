import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaiSanDgc, NewTaiSanDgc } from '../tai-san-dgc.model';

export type PartialUpdateTaiSanDgc = Partial<ITaiSanDgc> & Pick<ITaiSanDgc, 'id'>;

type RestOf<T extends ITaiSanDgc | NewTaiSanDgc> = Omit<T, 'ngayThaoTac' | 'ngayBdNganChan' | 'ngayKtNganChan'> & {
  ngayThaoTac?: string | null;
  ngayBdNganChan?: string | null;
  ngayKtNganChan?: string | null;
};

export type RestTaiSanDgc = RestOf<ITaiSanDgc>;

export type NewRestTaiSanDgc = RestOf<NewTaiSanDgc>;

export type PartialUpdateRestTaiSanDgc = RestOf<PartialUpdateTaiSanDgc>;

export type EntityResponseType = HttpResponse<ITaiSanDgc>;
export type EntityArrayResponseType = HttpResponse<ITaiSanDgc[]>;

@Injectable({ providedIn: 'root' })
export class TaiSanDgcService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tai-san-dgcs');

  create(taiSanDgc: NewTaiSanDgc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taiSanDgc);
    return this.http
      .post<RestTaiSanDgc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(taiSanDgc: ITaiSanDgc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taiSanDgc);
    return this.http
      .put<RestTaiSanDgc>(`${this.resourceUrl}/${this.getTaiSanDgcIdentifier(taiSanDgc)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(taiSanDgc: PartialUpdateTaiSanDgc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taiSanDgc);
    return this.http
      .patch<RestTaiSanDgc>(`${this.resourceUrl}/${this.getTaiSanDgcIdentifier(taiSanDgc)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTaiSanDgc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTaiSanDgc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTaiSanDgcIdentifier(taiSanDgc: Pick<ITaiSanDgc, 'id'>): number {
    return taiSanDgc.id;
  }

  compareTaiSanDgc(o1: Pick<ITaiSanDgc, 'id'> | null, o2: Pick<ITaiSanDgc, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaiSanDgcIdentifier(o1) === this.getTaiSanDgcIdentifier(o2) : o1 === o2;
  }

  addTaiSanDgcToCollectionIfMissing<Type extends Pick<ITaiSanDgc, 'id'>>(
    taiSanDgcCollection: Type[],
    ...taiSanDgcsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taiSanDgcs: Type[] = taiSanDgcsToCheck.filter(isPresent);
    if (taiSanDgcs.length > 0) {
      const taiSanDgcCollectionIdentifiers = taiSanDgcCollection.map(taiSanDgcItem => this.getTaiSanDgcIdentifier(taiSanDgcItem));
      const taiSanDgcsToAdd = taiSanDgcs.filter(taiSanDgcItem => {
        const taiSanDgcIdentifier = this.getTaiSanDgcIdentifier(taiSanDgcItem);
        if (taiSanDgcCollectionIdentifiers.includes(taiSanDgcIdentifier)) {
          return false;
        }
        taiSanDgcCollectionIdentifiers.push(taiSanDgcIdentifier);
        return true;
      });
      return [...taiSanDgcsToAdd, ...taiSanDgcCollection];
    }
    return taiSanDgcCollection;
  }

  protected convertDateFromClient<T extends ITaiSanDgc | NewTaiSanDgc | PartialUpdateTaiSanDgc>(taiSanDgc: T): RestOf<T> {
    return {
      ...taiSanDgc,
      ngayThaoTac: taiSanDgc.ngayThaoTac?.format(DATE_FORMAT) ?? null,
      ngayBdNganChan: taiSanDgc.ngayBdNganChan?.format(DATE_FORMAT) ?? null,
      ngayKtNganChan: taiSanDgc.ngayKtNganChan?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restTaiSanDgc: RestTaiSanDgc): ITaiSanDgc {
    return {
      ...restTaiSanDgc,
      ngayThaoTac: restTaiSanDgc.ngayThaoTac ? dayjs(restTaiSanDgc.ngayThaoTac) : undefined,
      ngayBdNganChan: restTaiSanDgc.ngayBdNganChan ? dayjs(restTaiSanDgc.ngayBdNganChan) : undefined,
      ngayKtNganChan: restTaiSanDgc.ngayKtNganChan ? dayjs(restTaiSanDgc.ngayKtNganChan) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTaiSanDgc>): HttpResponse<ITaiSanDgc> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTaiSanDgc[]>): HttpResponse<ITaiSanDgc[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
