import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILogHoaDonDienTu, NewLogHoaDonDienTu } from '../log-hoa-don-dien-tu.model';

export type PartialUpdateLogHoaDonDienTu = Partial<ILogHoaDonDienTu> & Pick<ILogHoaDonDienTu, 'id'>;

type RestOf<T extends ILogHoaDonDienTu | NewLogHoaDonDienTu> = Omit<T, 'ngayPhatHanh'> & {
  ngayPhatHanh?: string | null;
};

export type RestLogHoaDonDienTu = RestOf<ILogHoaDonDienTu>;

export type NewRestLogHoaDonDienTu = RestOf<NewLogHoaDonDienTu>;

export type PartialUpdateRestLogHoaDonDienTu = RestOf<PartialUpdateLogHoaDonDienTu>;

export type EntityResponseType = HttpResponse<ILogHoaDonDienTu>;
export type EntityArrayResponseType = HttpResponse<ILogHoaDonDienTu[]>;

@Injectable({ providedIn: 'root' })
export class LogHoaDonDienTuService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/log-hoa-don-dien-tus');

  create(logHoaDonDienTu: NewLogHoaDonDienTu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logHoaDonDienTu);
    return this.http
      .post<RestLogHoaDonDienTu>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(logHoaDonDienTu: ILogHoaDonDienTu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logHoaDonDienTu);
    return this.http
      .put<RestLogHoaDonDienTu>(`${this.resourceUrl}/${this.getLogHoaDonDienTuIdentifier(logHoaDonDienTu)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(logHoaDonDienTu: PartialUpdateLogHoaDonDienTu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logHoaDonDienTu);
    return this.http
      .patch<RestLogHoaDonDienTu>(`${this.resourceUrl}/${this.getLogHoaDonDienTuIdentifier(logHoaDonDienTu)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestLogHoaDonDienTu>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLogHoaDonDienTu[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLogHoaDonDienTuIdentifier(logHoaDonDienTu: Pick<ILogHoaDonDienTu, 'id'>): number {
    return logHoaDonDienTu.id;
  }

  compareLogHoaDonDienTu(o1: Pick<ILogHoaDonDienTu, 'id'> | null, o2: Pick<ILogHoaDonDienTu, 'id'> | null): boolean {
    return o1 && o2 ? this.getLogHoaDonDienTuIdentifier(o1) === this.getLogHoaDonDienTuIdentifier(o2) : o1 === o2;
  }

  addLogHoaDonDienTuToCollectionIfMissing<Type extends Pick<ILogHoaDonDienTu, 'id'>>(
    logHoaDonDienTuCollection: Type[],
    ...logHoaDonDienTusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const logHoaDonDienTus: Type[] = logHoaDonDienTusToCheck.filter(isPresent);
    if (logHoaDonDienTus.length > 0) {
      const logHoaDonDienTuCollectionIdentifiers = logHoaDonDienTuCollection.map(logHoaDonDienTuItem =>
        this.getLogHoaDonDienTuIdentifier(logHoaDonDienTuItem),
      );
      const logHoaDonDienTusToAdd = logHoaDonDienTus.filter(logHoaDonDienTuItem => {
        const logHoaDonDienTuIdentifier = this.getLogHoaDonDienTuIdentifier(logHoaDonDienTuItem);
        if (logHoaDonDienTuCollectionIdentifiers.includes(logHoaDonDienTuIdentifier)) {
          return false;
        }
        logHoaDonDienTuCollectionIdentifiers.push(logHoaDonDienTuIdentifier);
        return true;
      });
      return [...logHoaDonDienTusToAdd, ...logHoaDonDienTuCollection];
    }
    return logHoaDonDienTuCollection;
  }

  protected convertDateFromClient<T extends ILogHoaDonDienTu | NewLogHoaDonDienTu | PartialUpdateLogHoaDonDienTu>(
    logHoaDonDienTu: T,
  ): RestOf<T> {
    return {
      ...logHoaDonDienTu,
      ngayPhatHanh: logHoaDonDienTu.ngayPhatHanh?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restLogHoaDonDienTu: RestLogHoaDonDienTu): ILogHoaDonDienTu {
    return {
      ...restLogHoaDonDienTu,
      ngayPhatHanh: restLogHoaDonDienTu.ngayPhatHanh ? dayjs(restLogHoaDonDienTu.ngayPhatHanh) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLogHoaDonDienTu>): HttpResponse<ILogHoaDonDienTu> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLogHoaDonDienTu[]>): HttpResponse<ILogHoaDonDienTu[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
