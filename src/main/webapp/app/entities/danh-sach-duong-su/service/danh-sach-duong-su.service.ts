import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhSachDuongSu, NewDanhSachDuongSu } from '../danh-sach-duong-su.model';

export type PartialUpdateDanhSachDuongSu = Partial<IDanhSachDuongSu> & Pick<IDanhSachDuongSu, 'id'>;

type RestOf<T extends IDanhSachDuongSu | NewDanhSachDuongSu> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestDanhSachDuongSu = RestOf<IDanhSachDuongSu>;

export type NewRestDanhSachDuongSu = RestOf<NewDanhSachDuongSu>;

export type PartialUpdateRestDanhSachDuongSu = RestOf<PartialUpdateDanhSachDuongSu>;

export type EntityResponseType = HttpResponse<IDanhSachDuongSu>;
export type EntityArrayResponseType = HttpResponse<IDanhSachDuongSu[]>;

@Injectable({ providedIn: 'root' })
export class DanhSachDuongSuService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-sach-duong-sus');

  create(danhSachDuongSu: NewDanhSachDuongSu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhSachDuongSu);
    return this.http
      .post<RestDanhSachDuongSu>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(danhSachDuongSu: IDanhSachDuongSu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhSachDuongSu);
    return this.http
      .put<RestDanhSachDuongSu>(`${this.resourceUrl}/${this.getDanhSachDuongSuIdentifier(danhSachDuongSu)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(danhSachDuongSu: PartialUpdateDanhSachDuongSu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhSachDuongSu);
    return this.http
      .patch<RestDanhSachDuongSu>(`${this.resourceUrl}/${this.getDanhSachDuongSuIdentifier(danhSachDuongSu)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDanhSachDuongSu>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDanhSachDuongSu[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhSachDuongSuIdentifier(danhSachDuongSu: Pick<IDanhSachDuongSu, 'id'>): number {
    return danhSachDuongSu.id;
  }

  compareDanhSachDuongSu(o1: Pick<IDanhSachDuongSu, 'id'> | null, o2: Pick<IDanhSachDuongSu, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhSachDuongSuIdentifier(o1) === this.getDanhSachDuongSuIdentifier(o2) : o1 === o2;
  }

  addDanhSachDuongSuToCollectionIfMissing<Type extends Pick<IDanhSachDuongSu, 'id'>>(
    danhSachDuongSuCollection: Type[],
    ...danhSachDuongSusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhSachDuongSus: Type[] = danhSachDuongSusToCheck.filter(isPresent);
    if (danhSachDuongSus.length > 0) {
      const danhSachDuongSuCollectionIdentifiers = danhSachDuongSuCollection.map(danhSachDuongSuItem =>
        this.getDanhSachDuongSuIdentifier(danhSachDuongSuItem),
      );
      const danhSachDuongSusToAdd = danhSachDuongSus.filter(danhSachDuongSuItem => {
        const danhSachDuongSuIdentifier = this.getDanhSachDuongSuIdentifier(danhSachDuongSuItem);
        if (danhSachDuongSuCollectionIdentifiers.includes(danhSachDuongSuIdentifier)) {
          return false;
        }
        danhSachDuongSuCollectionIdentifiers.push(danhSachDuongSuIdentifier);
        return true;
      });
      return [...danhSachDuongSusToAdd, ...danhSachDuongSuCollection];
    }
    return danhSachDuongSuCollection;
  }

  protected convertDateFromClient<T extends IDanhSachDuongSu | NewDanhSachDuongSu | PartialUpdateDanhSachDuongSu>(
    danhSachDuongSu: T,
  ): RestOf<T> {
    return {
      ...danhSachDuongSu,
      ngayThaoTac: danhSachDuongSu.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDanhSachDuongSu: RestDanhSachDuongSu): IDanhSachDuongSu {
    return {
      ...restDanhSachDuongSu,
      ngayThaoTac: restDanhSachDuongSu.ngayThaoTac ? dayjs(restDanhSachDuongSu.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDanhSachDuongSu>): HttpResponse<IDanhSachDuongSu> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDanhSachDuongSu[]>): HttpResponse<IDanhSachDuongSu[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
