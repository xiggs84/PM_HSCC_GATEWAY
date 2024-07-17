import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICauHinhHoaDonDienTu, NewCauHinhHoaDonDienTu } from '../cau-hinh-hoa-don-dien-tu.model';

export type PartialUpdateCauHinhHoaDonDienTu = Partial<ICauHinhHoaDonDienTu> & Pick<ICauHinhHoaDonDienTu, 'id'>;

type RestOf<T extends ICauHinhHoaDonDienTu | NewCauHinhHoaDonDienTu> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestCauHinhHoaDonDienTu = RestOf<ICauHinhHoaDonDienTu>;

export type NewRestCauHinhHoaDonDienTu = RestOf<NewCauHinhHoaDonDienTu>;

export type PartialUpdateRestCauHinhHoaDonDienTu = RestOf<PartialUpdateCauHinhHoaDonDienTu>;

export type EntityResponseType = HttpResponse<ICauHinhHoaDonDienTu>;
export type EntityArrayResponseType = HttpResponse<ICauHinhHoaDonDienTu[]>;

@Injectable({ providedIn: 'root' })
export class CauHinhHoaDonDienTuService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cau-hinh-hoa-don-dien-tus');

  create(cauHinhHoaDonDienTu: NewCauHinhHoaDonDienTu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cauHinhHoaDonDienTu);
    return this.http
      .post<RestCauHinhHoaDonDienTu>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cauHinhHoaDonDienTu: ICauHinhHoaDonDienTu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cauHinhHoaDonDienTu);
    return this.http
      .put<RestCauHinhHoaDonDienTu>(`${this.resourceUrl}/${this.getCauHinhHoaDonDienTuIdentifier(cauHinhHoaDonDienTu)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cauHinhHoaDonDienTu: PartialUpdateCauHinhHoaDonDienTu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cauHinhHoaDonDienTu);
    return this.http
      .patch<RestCauHinhHoaDonDienTu>(`${this.resourceUrl}/${this.getCauHinhHoaDonDienTuIdentifier(cauHinhHoaDonDienTu)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCauHinhHoaDonDienTu>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCauHinhHoaDonDienTu[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCauHinhHoaDonDienTuIdentifier(cauHinhHoaDonDienTu: Pick<ICauHinhHoaDonDienTu, 'id'>): number {
    return cauHinhHoaDonDienTu.id;
  }

  compareCauHinhHoaDonDienTu(o1: Pick<ICauHinhHoaDonDienTu, 'id'> | null, o2: Pick<ICauHinhHoaDonDienTu, 'id'> | null): boolean {
    return o1 && o2 ? this.getCauHinhHoaDonDienTuIdentifier(o1) === this.getCauHinhHoaDonDienTuIdentifier(o2) : o1 === o2;
  }

  addCauHinhHoaDonDienTuToCollectionIfMissing<Type extends Pick<ICauHinhHoaDonDienTu, 'id'>>(
    cauHinhHoaDonDienTuCollection: Type[],
    ...cauHinhHoaDonDienTusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cauHinhHoaDonDienTus: Type[] = cauHinhHoaDonDienTusToCheck.filter(isPresent);
    if (cauHinhHoaDonDienTus.length > 0) {
      const cauHinhHoaDonDienTuCollectionIdentifiers = cauHinhHoaDonDienTuCollection.map(cauHinhHoaDonDienTuItem =>
        this.getCauHinhHoaDonDienTuIdentifier(cauHinhHoaDonDienTuItem),
      );
      const cauHinhHoaDonDienTusToAdd = cauHinhHoaDonDienTus.filter(cauHinhHoaDonDienTuItem => {
        const cauHinhHoaDonDienTuIdentifier = this.getCauHinhHoaDonDienTuIdentifier(cauHinhHoaDonDienTuItem);
        if (cauHinhHoaDonDienTuCollectionIdentifiers.includes(cauHinhHoaDonDienTuIdentifier)) {
          return false;
        }
        cauHinhHoaDonDienTuCollectionIdentifiers.push(cauHinhHoaDonDienTuIdentifier);
        return true;
      });
      return [...cauHinhHoaDonDienTusToAdd, ...cauHinhHoaDonDienTuCollection];
    }
    return cauHinhHoaDonDienTuCollection;
  }

  protected convertDateFromClient<T extends ICauHinhHoaDonDienTu | NewCauHinhHoaDonDienTu | PartialUpdateCauHinhHoaDonDienTu>(
    cauHinhHoaDonDienTu: T,
  ): RestOf<T> {
    return {
      ...cauHinhHoaDonDienTu,
      ngayThaoTac: cauHinhHoaDonDienTu.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCauHinhHoaDonDienTu: RestCauHinhHoaDonDienTu): ICauHinhHoaDonDienTu {
    return {
      ...restCauHinhHoaDonDienTu,
      ngayThaoTac: restCauHinhHoaDonDienTu.ngayThaoTac ? dayjs(restCauHinhHoaDonDienTu.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCauHinhHoaDonDienTu>): HttpResponse<ICauHinhHoaDonDienTu> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCauHinhHoaDonDienTu[]>): HttpResponse<ICauHinhHoaDonDienTu[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
