import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucDonVi, NewDanhMucDonVi } from '../danh-muc-don-vi.model';

export type PartialUpdateDanhMucDonVi = Partial<IDanhMucDonVi> & Pick<IDanhMucDonVi, 'id'>;

type RestOf<T extends IDanhMucDonVi | NewDanhMucDonVi> = Omit<T, 'ngayKhaiBao'> & {
  ngayKhaiBao?: string | null;
};

export type RestDanhMucDonVi = RestOf<IDanhMucDonVi>;

export type NewRestDanhMucDonVi = RestOf<NewDanhMucDonVi>;

export type PartialUpdateRestDanhMucDonVi = RestOf<PartialUpdateDanhMucDonVi>;

export type EntityResponseType = HttpResponse<IDanhMucDonVi>;
export type EntityArrayResponseType = HttpResponse<IDanhMucDonVi[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucDonViService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-don-vis');

  create(danhMucDonVi: NewDanhMucDonVi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucDonVi);
    return this.http
      .post<RestDanhMucDonVi>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(danhMucDonVi: IDanhMucDonVi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucDonVi);
    return this.http
      .put<RestDanhMucDonVi>(`${this.resourceUrl}/${this.getDanhMucDonViIdentifier(danhMucDonVi)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(danhMucDonVi: PartialUpdateDanhMucDonVi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucDonVi);
    return this.http
      .patch<RestDanhMucDonVi>(`${this.resourceUrl}/${this.getDanhMucDonViIdentifier(danhMucDonVi)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDanhMucDonVi>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDanhMucDonVi[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucDonViIdentifier(danhMucDonVi: Pick<IDanhMucDonVi, 'id'>): number {
    return danhMucDonVi.id;
  }

  compareDanhMucDonVi(o1: Pick<IDanhMucDonVi, 'id'> | null, o2: Pick<IDanhMucDonVi, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucDonViIdentifier(o1) === this.getDanhMucDonViIdentifier(o2) : o1 === o2;
  }

  addDanhMucDonViToCollectionIfMissing<Type extends Pick<IDanhMucDonVi, 'id'>>(
    danhMucDonViCollection: Type[],
    ...danhMucDonVisToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucDonVis: Type[] = danhMucDonVisToCheck.filter(isPresent);
    if (danhMucDonVis.length > 0) {
      const danhMucDonViCollectionIdentifiers = danhMucDonViCollection.map(danhMucDonViItem =>
        this.getDanhMucDonViIdentifier(danhMucDonViItem),
      );
      const danhMucDonVisToAdd = danhMucDonVis.filter(danhMucDonViItem => {
        const danhMucDonViIdentifier = this.getDanhMucDonViIdentifier(danhMucDonViItem);
        if (danhMucDonViCollectionIdentifiers.includes(danhMucDonViIdentifier)) {
          return false;
        }
        danhMucDonViCollectionIdentifiers.push(danhMucDonViIdentifier);
        return true;
      });
      return [...danhMucDonVisToAdd, ...danhMucDonViCollection];
    }
    return danhMucDonViCollection;
  }

  protected convertDateFromClient<T extends IDanhMucDonVi | NewDanhMucDonVi | PartialUpdateDanhMucDonVi>(danhMucDonVi: T): RestOf<T> {
    return {
      ...danhMucDonVi,
      ngayKhaiBao: danhMucDonVi.ngayKhaiBao?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDanhMucDonVi: RestDanhMucDonVi): IDanhMucDonVi {
    return {
      ...restDanhMucDonVi,
      ngayKhaiBao: restDanhMucDonVi.ngayKhaiBao ? dayjs(restDanhMucDonVi.ngayKhaiBao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDanhMucDonVi>): HttpResponse<IDanhMucDonVi> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDanhMucDonVi[]>): HttpResponse<IDanhMucDonVi[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
