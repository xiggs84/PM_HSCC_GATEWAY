import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaiSanDatNha, NewTaiSanDatNha } from '../tai-san-dat-nha.model';

export type PartialUpdateTaiSanDatNha = Partial<ITaiSanDatNha> & Pick<ITaiSanDatNha, 'id'>;

type RestOf<T extends ITaiSanDatNha | NewTaiSanDatNha> = Omit<T, 'ngayThaoTac' | 'ngayBdNganChan' | 'ngayKtNganChan'> & {
  ngayThaoTac?: string | null;
  ngayBdNganChan?: string | null;
  ngayKtNganChan?: string | null;
};

export type RestTaiSanDatNha = RestOf<ITaiSanDatNha>;

export type NewRestTaiSanDatNha = RestOf<NewTaiSanDatNha>;

export type PartialUpdateRestTaiSanDatNha = RestOf<PartialUpdateTaiSanDatNha>;

export type EntityResponseType = HttpResponse<ITaiSanDatNha>;
export type EntityArrayResponseType = HttpResponse<ITaiSanDatNha[]>;

@Injectable({ providedIn: 'root' })
export class TaiSanDatNhaService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tai-san-dat-nhas');

  create(taiSanDatNha: NewTaiSanDatNha): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taiSanDatNha);
    return this.http
      .post<RestTaiSanDatNha>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(taiSanDatNha: ITaiSanDatNha): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taiSanDatNha);
    return this.http
      .put<RestTaiSanDatNha>(`${this.resourceUrl}/${this.getTaiSanDatNhaIdentifier(taiSanDatNha)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(taiSanDatNha: PartialUpdateTaiSanDatNha): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taiSanDatNha);
    return this.http
      .patch<RestTaiSanDatNha>(`${this.resourceUrl}/${this.getTaiSanDatNhaIdentifier(taiSanDatNha)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTaiSanDatNha>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTaiSanDatNha[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTaiSanDatNhaIdentifier(taiSanDatNha: Pick<ITaiSanDatNha, 'id'>): number {
    return taiSanDatNha.id;
  }

  compareTaiSanDatNha(o1: Pick<ITaiSanDatNha, 'id'> | null, o2: Pick<ITaiSanDatNha, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaiSanDatNhaIdentifier(o1) === this.getTaiSanDatNhaIdentifier(o2) : o1 === o2;
  }

  addTaiSanDatNhaToCollectionIfMissing<Type extends Pick<ITaiSanDatNha, 'id'>>(
    taiSanDatNhaCollection: Type[],
    ...taiSanDatNhasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taiSanDatNhas: Type[] = taiSanDatNhasToCheck.filter(isPresent);
    if (taiSanDatNhas.length > 0) {
      const taiSanDatNhaCollectionIdentifiers = taiSanDatNhaCollection.map(taiSanDatNhaItem =>
        this.getTaiSanDatNhaIdentifier(taiSanDatNhaItem),
      );
      const taiSanDatNhasToAdd = taiSanDatNhas.filter(taiSanDatNhaItem => {
        const taiSanDatNhaIdentifier = this.getTaiSanDatNhaIdentifier(taiSanDatNhaItem);
        if (taiSanDatNhaCollectionIdentifiers.includes(taiSanDatNhaIdentifier)) {
          return false;
        }
        taiSanDatNhaCollectionIdentifiers.push(taiSanDatNhaIdentifier);
        return true;
      });
      return [...taiSanDatNhasToAdd, ...taiSanDatNhaCollection];
    }
    return taiSanDatNhaCollection;
  }

  protected convertDateFromClient<T extends ITaiSanDatNha | NewTaiSanDatNha | PartialUpdateTaiSanDatNha>(taiSanDatNha: T): RestOf<T> {
    return {
      ...taiSanDatNha,
      ngayThaoTac: taiSanDatNha.ngayThaoTac?.format(DATE_FORMAT) ?? null,
      ngayBdNganChan: taiSanDatNha.ngayBdNganChan?.format(DATE_FORMAT) ?? null,
      ngayKtNganChan: taiSanDatNha.ngayKtNganChan?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restTaiSanDatNha: RestTaiSanDatNha): ITaiSanDatNha {
    return {
      ...restTaiSanDatNha,
      ngayThaoTac: restTaiSanDatNha.ngayThaoTac ? dayjs(restTaiSanDatNha.ngayThaoTac) : undefined,
      ngayBdNganChan: restTaiSanDatNha.ngayBdNganChan ? dayjs(restTaiSanDatNha.ngayBdNganChan) : undefined,
      ngayKtNganChan: restTaiSanDatNha.ngayKtNganChan ? dayjs(restTaiSanDatNha.ngayKtNganChan) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTaiSanDatNha>): HttpResponse<ITaiSanDatNha> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTaiSanDatNha[]>): HttpResponse<ITaiSanDatNha[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
