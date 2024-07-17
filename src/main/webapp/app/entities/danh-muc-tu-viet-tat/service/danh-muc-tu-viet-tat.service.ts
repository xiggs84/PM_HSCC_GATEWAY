import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucTuVietTat, NewDanhMucTuVietTat } from '../danh-muc-tu-viet-tat.model';

export type PartialUpdateDanhMucTuVietTat = Partial<IDanhMucTuVietTat> & Pick<IDanhMucTuVietTat, 'id'>;

type RestOf<T extends IDanhMucTuVietTat | NewDanhMucTuVietTat> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestDanhMucTuVietTat = RestOf<IDanhMucTuVietTat>;

export type NewRestDanhMucTuVietTat = RestOf<NewDanhMucTuVietTat>;

export type PartialUpdateRestDanhMucTuVietTat = RestOf<PartialUpdateDanhMucTuVietTat>;

export type EntityResponseType = HttpResponse<IDanhMucTuVietTat>;
export type EntityArrayResponseType = HttpResponse<IDanhMucTuVietTat[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucTuVietTatService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-tu-viet-tats');

  create(danhMucTuVietTat: NewDanhMucTuVietTat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucTuVietTat);
    return this.http
      .post<RestDanhMucTuVietTat>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(danhMucTuVietTat: IDanhMucTuVietTat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucTuVietTat);
    return this.http
      .put<RestDanhMucTuVietTat>(`${this.resourceUrl}/${this.getDanhMucTuVietTatIdentifier(danhMucTuVietTat)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(danhMucTuVietTat: PartialUpdateDanhMucTuVietTat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucTuVietTat);
    return this.http
      .patch<RestDanhMucTuVietTat>(`${this.resourceUrl}/${this.getDanhMucTuVietTatIdentifier(danhMucTuVietTat)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDanhMucTuVietTat>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDanhMucTuVietTat[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucTuVietTatIdentifier(danhMucTuVietTat: Pick<IDanhMucTuVietTat, 'id'>): number {
    return danhMucTuVietTat.id;
  }

  compareDanhMucTuVietTat(o1: Pick<IDanhMucTuVietTat, 'id'> | null, o2: Pick<IDanhMucTuVietTat, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucTuVietTatIdentifier(o1) === this.getDanhMucTuVietTatIdentifier(o2) : o1 === o2;
  }

  addDanhMucTuVietTatToCollectionIfMissing<Type extends Pick<IDanhMucTuVietTat, 'id'>>(
    danhMucTuVietTatCollection: Type[],
    ...danhMucTuVietTatsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucTuVietTats: Type[] = danhMucTuVietTatsToCheck.filter(isPresent);
    if (danhMucTuVietTats.length > 0) {
      const danhMucTuVietTatCollectionIdentifiers = danhMucTuVietTatCollection.map(danhMucTuVietTatItem =>
        this.getDanhMucTuVietTatIdentifier(danhMucTuVietTatItem),
      );
      const danhMucTuVietTatsToAdd = danhMucTuVietTats.filter(danhMucTuVietTatItem => {
        const danhMucTuVietTatIdentifier = this.getDanhMucTuVietTatIdentifier(danhMucTuVietTatItem);
        if (danhMucTuVietTatCollectionIdentifiers.includes(danhMucTuVietTatIdentifier)) {
          return false;
        }
        danhMucTuVietTatCollectionIdentifiers.push(danhMucTuVietTatIdentifier);
        return true;
      });
      return [...danhMucTuVietTatsToAdd, ...danhMucTuVietTatCollection];
    }
    return danhMucTuVietTatCollection;
  }

  protected convertDateFromClient<T extends IDanhMucTuVietTat | NewDanhMucTuVietTat | PartialUpdateDanhMucTuVietTat>(
    danhMucTuVietTat: T,
  ): RestOf<T> {
    return {
      ...danhMucTuVietTat,
      ngayThaoTac: danhMucTuVietTat.ngayThaoTac?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restDanhMucTuVietTat: RestDanhMucTuVietTat): IDanhMucTuVietTat {
    return {
      ...restDanhMucTuVietTat,
      ngayThaoTac: restDanhMucTuVietTat.ngayThaoTac ? dayjs(restDanhMucTuVietTat.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDanhMucTuVietTat>): HttpResponse<IDanhMucTuVietTat> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDanhMucTuVietTat[]>): HttpResponse<IDanhMucTuVietTat[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
