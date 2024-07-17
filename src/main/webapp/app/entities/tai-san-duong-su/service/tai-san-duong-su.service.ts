import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaiSanDuongSu, NewTaiSanDuongSu } from '../tai-san-duong-su.model';

export type PartialUpdateTaiSanDuongSu = Partial<ITaiSanDuongSu> & Pick<ITaiSanDuongSu, 'id'>;

type RestOf<T extends ITaiSanDuongSu | NewTaiSanDuongSu> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestTaiSanDuongSu = RestOf<ITaiSanDuongSu>;

export type NewRestTaiSanDuongSu = RestOf<NewTaiSanDuongSu>;

export type PartialUpdateRestTaiSanDuongSu = RestOf<PartialUpdateTaiSanDuongSu>;

export type EntityResponseType = HttpResponse<ITaiSanDuongSu>;
export type EntityArrayResponseType = HttpResponse<ITaiSanDuongSu[]>;

@Injectable({ providedIn: 'root' })
export class TaiSanDuongSuService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tai-san-duong-sus');

  create(taiSanDuongSu: NewTaiSanDuongSu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taiSanDuongSu);
    return this.http
      .post<RestTaiSanDuongSu>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(taiSanDuongSu: ITaiSanDuongSu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taiSanDuongSu);
    return this.http
      .put<RestTaiSanDuongSu>(`${this.resourceUrl}/${this.getTaiSanDuongSuIdentifier(taiSanDuongSu)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(taiSanDuongSu: PartialUpdateTaiSanDuongSu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taiSanDuongSu);
    return this.http
      .patch<RestTaiSanDuongSu>(`${this.resourceUrl}/${this.getTaiSanDuongSuIdentifier(taiSanDuongSu)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTaiSanDuongSu>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTaiSanDuongSu[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTaiSanDuongSuIdentifier(taiSanDuongSu: Pick<ITaiSanDuongSu, 'id'>): number {
    return taiSanDuongSu.id;
  }

  compareTaiSanDuongSu(o1: Pick<ITaiSanDuongSu, 'id'> | null, o2: Pick<ITaiSanDuongSu, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaiSanDuongSuIdentifier(o1) === this.getTaiSanDuongSuIdentifier(o2) : o1 === o2;
  }

  addTaiSanDuongSuToCollectionIfMissing<Type extends Pick<ITaiSanDuongSu, 'id'>>(
    taiSanDuongSuCollection: Type[],
    ...taiSanDuongSusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taiSanDuongSus: Type[] = taiSanDuongSusToCheck.filter(isPresent);
    if (taiSanDuongSus.length > 0) {
      const taiSanDuongSuCollectionIdentifiers = taiSanDuongSuCollection.map(taiSanDuongSuItem =>
        this.getTaiSanDuongSuIdentifier(taiSanDuongSuItem),
      );
      const taiSanDuongSusToAdd = taiSanDuongSus.filter(taiSanDuongSuItem => {
        const taiSanDuongSuIdentifier = this.getTaiSanDuongSuIdentifier(taiSanDuongSuItem);
        if (taiSanDuongSuCollectionIdentifiers.includes(taiSanDuongSuIdentifier)) {
          return false;
        }
        taiSanDuongSuCollectionIdentifiers.push(taiSanDuongSuIdentifier);
        return true;
      });
      return [...taiSanDuongSusToAdd, ...taiSanDuongSuCollection];
    }
    return taiSanDuongSuCollection;
  }

  protected convertDateFromClient<T extends ITaiSanDuongSu | NewTaiSanDuongSu | PartialUpdateTaiSanDuongSu>(taiSanDuongSu: T): RestOf<T> {
    return {
      ...taiSanDuongSu,
      ngayThaoTac: taiSanDuongSu.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restTaiSanDuongSu: RestTaiSanDuongSu): ITaiSanDuongSu {
    return {
      ...restTaiSanDuongSu,
      ngayThaoTac: restTaiSanDuongSu.ngayThaoTac ? dayjs(restTaiSanDuongSu.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTaiSanDuongSu>): HttpResponse<ITaiSanDuongSu> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTaiSanDuongSu[]>): HttpResponse<ITaiSanDuongSu[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
