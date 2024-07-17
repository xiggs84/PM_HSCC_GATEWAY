import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhsachDsNganchanTmp, NewDanhsachDsNganchanTmp } from '../danhsach-ds-nganchan-tmp.model';

export type PartialUpdateDanhsachDsNganchanTmp = Partial<IDanhsachDsNganchanTmp> & Pick<IDanhsachDsNganchanTmp, 'id'>;

type RestOf<T extends IDanhsachDsNganchanTmp | NewDanhsachDsNganchanTmp> = Omit<T, 'ngayNganChan'> & {
  ngayNganChan?: string | null;
};

export type RestDanhsachDsNganchanTmp = RestOf<IDanhsachDsNganchanTmp>;

export type NewRestDanhsachDsNganchanTmp = RestOf<NewDanhsachDsNganchanTmp>;

export type PartialUpdateRestDanhsachDsNganchanTmp = RestOf<PartialUpdateDanhsachDsNganchanTmp>;

export type EntityResponseType = HttpResponse<IDanhsachDsNganchanTmp>;
export type EntityArrayResponseType = HttpResponse<IDanhsachDsNganchanTmp[]>;

@Injectable({ providedIn: 'root' })
export class DanhsachDsNganchanTmpService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danhsach-ds-nganchan-tmps');

  create(danhsachDsNganchanTmp: NewDanhsachDsNganchanTmp): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhsachDsNganchanTmp);
    return this.http
      .post<RestDanhsachDsNganchanTmp>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(danhsachDsNganchanTmp: IDanhsachDsNganchanTmp): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhsachDsNganchanTmp);
    return this.http
      .put<RestDanhsachDsNganchanTmp>(`${this.resourceUrl}/${this.getDanhsachDsNganchanTmpIdentifier(danhsachDsNganchanTmp)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(danhsachDsNganchanTmp: PartialUpdateDanhsachDsNganchanTmp): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhsachDsNganchanTmp);
    return this.http
      .patch<RestDanhsachDsNganchanTmp>(`${this.resourceUrl}/${this.getDanhsachDsNganchanTmpIdentifier(danhsachDsNganchanTmp)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDanhsachDsNganchanTmp>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDanhsachDsNganchanTmp[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhsachDsNganchanTmpIdentifier(danhsachDsNganchanTmp: Pick<IDanhsachDsNganchanTmp, 'id'>): number {
    return danhsachDsNganchanTmp.id;
  }

  compareDanhsachDsNganchanTmp(o1: Pick<IDanhsachDsNganchanTmp, 'id'> | null, o2: Pick<IDanhsachDsNganchanTmp, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhsachDsNganchanTmpIdentifier(o1) === this.getDanhsachDsNganchanTmpIdentifier(o2) : o1 === o2;
  }

  addDanhsachDsNganchanTmpToCollectionIfMissing<Type extends Pick<IDanhsachDsNganchanTmp, 'id'>>(
    danhsachDsNganchanTmpCollection: Type[],
    ...danhsachDsNganchanTmpsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhsachDsNganchanTmps: Type[] = danhsachDsNganchanTmpsToCheck.filter(isPresent);
    if (danhsachDsNganchanTmps.length > 0) {
      const danhsachDsNganchanTmpCollectionIdentifiers = danhsachDsNganchanTmpCollection.map(danhsachDsNganchanTmpItem =>
        this.getDanhsachDsNganchanTmpIdentifier(danhsachDsNganchanTmpItem),
      );
      const danhsachDsNganchanTmpsToAdd = danhsachDsNganchanTmps.filter(danhsachDsNganchanTmpItem => {
        const danhsachDsNganchanTmpIdentifier = this.getDanhsachDsNganchanTmpIdentifier(danhsachDsNganchanTmpItem);
        if (danhsachDsNganchanTmpCollectionIdentifiers.includes(danhsachDsNganchanTmpIdentifier)) {
          return false;
        }
        danhsachDsNganchanTmpCollectionIdentifiers.push(danhsachDsNganchanTmpIdentifier);
        return true;
      });
      return [...danhsachDsNganchanTmpsToAdd, ...danhsachDsNganchanTmpCollection];
    }
    return danhsachDsNganchanTmpCollection;
  }

  protected convertDateFromClient<T extends IDanhsachDsNganchanTmp | NewDanhsachDsNganchanTmp | PartialUpdateDanhsachDsNganchanTmp>(
    danhsachDsNganchanTmp: T,
  ): RestOf<T> {
    return {
      ...danhsachDsNganchanTmp,
      ngayNganChan: danhsachDsNganchanTmp.ngayNganChan?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDanhsachDsNganchanTmp: RestDanhsachDsNganchanTmp): IDanhsachDsNganchanTmp {
    return {
      ...restDanhsachDsNganchanTmp,
      ngayNganChan: restDanhsachDsNganchanTmp.ngayNganChan ? dayjs(restDanhsachDsNganchanTmp.ngayNganChan) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDanhsachDsNganchanTmp>): HttpResponse<IDanhsachDsNganchanTmp> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDanhsachDsNganchanTmp[]>): HttpResponse<IDanhsachDsNganchanTmp[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
