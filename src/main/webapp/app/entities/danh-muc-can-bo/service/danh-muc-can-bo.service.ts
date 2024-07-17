import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucCanBo, NewDanhMucCanBo } from '../danh-muc-can-bo.model';

export type PartialUpdateDanhMucCanBo = Partial<IDanhMucCanBo> & Pick<IDanhMucCanBo, 'id'>;

type RestOf<T extends IDanhMucCanBo | NewDanhMucCanBo> = Omit<T, 'namSinh'> & {
  namSinh?: string | null;
};

export type RestDanhMucCanBo = RestOf<IDanhMucCanBo>;

export type NewRestDanhMucCanBo = RestOf<NewDanhMucCanBo>;

export type PartialUpdateRestDanhMucCanBo = RestOf<PartialUpdateDanhMucCanBo>;

export type EntityResponseType = HttpResponse<IDanhMucCanBo>;
export type EntityArrayResponseType = HttpResponse<IDanhMucCanBo[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucCanBoService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-can-bos');

  create(danhMucCanBo: NewDanhMucCanBo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucCanBo);
    return this.http
      .post<RestDanhMucCanBo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(danhMucCanBo: IDanhMucCanBo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucCanBo);
    return this.http
      .put<RestDanhMucCanBo>(`${this.resourceUrl}/${this.getDanhMucCanBoIdentifier(danhMucCanBo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(danhMucCanBo: PartialUpdateDanhMucCanBo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucCanBo);
    return this.http
      .patch<RestDanhMucCanBo>(`${this.resourceUrl}/${this.getDanhMucCanBoIdentifier(danhMucCanBo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDanhMucCanBo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDanhMucCanBo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucCanBoIdentifier(danhMucCanBo: Pick<IDanhMucCanBo, 'id'>): number {
    return danhMucCanBo.id;
  }

  compareDanhMucCanBo(o1: Pick<IDanhMucCanBo, 'id'> | null, o2: Pick<IDanhMucCanBo, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucCanBoIdentifier(o1) === this.getDanhMucCanBoIdentifier(o2) : o1 === o2;
  }

  addDanhMucCanBoToCollectionIfMissing<Type extends Pick<IDanhMucCanBo, 'id'>>(
    danhMucCanBoCollection: Type[],
    ...danhMucCanBosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucCanBos: Type[] = danhMucCanBosToCheck.filter(isPresent);
    if (danhMucCanBos.length > 0) {
      const danhMucCanBoCollectionIdentifiers = danhMucCanBoCollection.map(danhMucCanBoItem =>
        this.getDanhMucCanBoIdentifier(danhMucCanBoItem),
      );
      const danhMucCanBosToAdd = danhMucCanBos.filter(danhMucCanBoItem => {
        const danhMucCanBoIdentifier = this.getDanhMucCanBoIdentifier(danhMucCanBoItem);
        if (danhMucCanBoCollectionIdentifiers.includes(danhMucCanBoIdentifier)) {
          return false;
        }
        danhMucCanBoCollectionIdentifiers.push(danhMucCanBoIdentifier);
        return true;
      });
      return [...danhMucCanBosToAdd, ...danhMucCanBoCollection];
    }
    return danhMucCanBoCollection;
  }

  protected convertDateFromClient<T extends IDanhMucCanBo | NewDanhMucCanBo | PartialUpdateDanhMucCanBo>(danhMucCanBo: T): RestOf<T> {
    return {
      ...danhMucCanBo,
      namSinh: danhMucCanBo.namSinh?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDanhMucCanBo: RestDanhMucCanBo): IDanhMucCanBo {
    return {
      ...restDanhMucCanBo,
      namSinh: restDanhMucCanBo.namSinh ? dayjs(restDanhMucCanBo.namSinh) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDanhMucCanBo>): HttpResponse<IDanhMucCanBo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDanhMucCanBo[]>): HttpResponse<IDanhMucCanBo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
