import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILogDangNhap, NewLogDangNhap } from '../log-dang-nhap.model';

export type PartialUpdateLogDangNhap = Partial<ILogDangNhap> & Pick<ILogDangNhap, 'id'>;

type RestOf<T extends ILogDangNhap | NewLogDangNhap> = Omit<T, 'ngayDangNhap'> & {
  ngayDangNhap?: string | null;
};

export type RestLogDangNhap = RestOf<ILogDangNhap>;

export type NewRestLogDangNhap = RestOf<NewLogDangNhap>;

export type PartialUpdateRestLogDangNhap = RestOf<PartialUpdateLogDangNhap>;

export type EntityResponseType = HttpResponse<ILogDangNhap>;
export type EntityArrayResponseType = HttpResponse<ILogDangNhap[]>;

@Injectable({ providedIn: 'root' })
export class LogDangNhapService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/log-dang-nhaps');

  create(logDangNhap: NewLogDangNhap): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logDangNhap);
    return this.http
      .post<RestLogDangNhap>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(logDangNhap: ILogDangNhap): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logDangNhap);
    return this.http
      .put<RestLogDangNhap>(`${this.resourceUrl}/${this.getLogDangNhapIdentifier(logDangNhap)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(logDangNhap: PartialUpdateLogDangNhap): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logDangNhap);
    return this.http
      .patch<RestLogDangNhap>(`${this.resourceUrl}/${this.getLogDangNhapIdentifier(logDangNhap)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestLogDangNhap>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLogDangNhap[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLogDangNhapIdentifier(logDangNhap: Pick<ILogDangNhap, 'id'>): number {
    return logDangNhap.id;
  }

  compareLogDangNhap(o1: Pick<ILogDangNhap, 'id'> | null, o2: Pick<ILogDangNhap, 'id'> | null): boolean {
    return o1 && o2 ? this.getLogDangNhapIdentifier(o1) === this.getLogDangNhapIdentifier(o2) : o1 === o2;
  }

  addLogDangNhapToCollectionIfMissing<Type extends Pick<ILogDangNhap, 'id'>>(
    logDangNhapCollection: Type[],
    ...logDangNhapsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const logDangNhaps: Type[] = logDangNhapsToCheck.filter(isPresent);
    if (logDangNhaps.length > 0) {
      const logDangNhapCollectionIdentifiers = logDangNhapCollection.map(logDangNhapItem => this.getLogDangNhapIdentifier(logDangNhapItem));
      const logDangNhapsToAdd = logDangNhaps.filter(logDangNhapItem => {
        const logDangNhapIdentifier = this.getLogDangNhapIdentifier(logDangNhapItem);
        if (logDangNhapCollectionIdentifiers.includes(logDangNhapIdentifier)) {
          return false;
        }
        logDangNhapCollectionIdentifiers.push(logDangNhapIdentifier);
        return true;
      });
      return [...logDangNhapsToAdd, ...logDangNhapCollection];
    }
    return logDangNhapCollection;
  }

  protected convertDateFromClient<T extends ILogDangNhap | NewLogDangNhap | PartialUpdateLogDangNhap>(logDangNhap: T): RestOf<T> {
    return {
      ...logDangNhap,
      ngayDangNhap: logDangNhap.ngayDangNhap?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restLogDangNhap: RestLogDangNhap): ILogDangNhap {
    return {
      ...restLogDangNhap,
      ngayDangNhap: restLogDangNhap.ngayDangNhap ? dayjs(restLogDangNhap.ngayDangNhap) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLogDangNhap>): HttpResponse<ILogDangNhap> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLogDangNhap[]>): HttpResponse<ILogDangNhap[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
