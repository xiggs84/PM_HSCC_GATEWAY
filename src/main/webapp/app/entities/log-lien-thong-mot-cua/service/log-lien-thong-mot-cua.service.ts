import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILogLienThongMotCua, NewLogLienThongMotCua } from '../log-lien-thong-mot-cua.model';

export type PartialUpdateLogLienThongMotCua = Partial<ILogLienThongMotCua> & Pick<ILogLienThongMotCua, 'id'>;

type RestOf<T extends ILogLienThongMotCua | NewLogLienThongMotCua> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestLogLienThongMotCua = RestOf<ILogLienThongMotCua>;

export type NewRestLogLienThongMotCua = RestOf<NewLogLienThongMotCua>;

export type PartialUpdateRestLogLienThongMotCua = RestOf<PartialUpdateLogLienThongMotCua>;

export type EntityResponseType = HttpResponse<ILogLienThongMotCua>;
export type EntityArrayResponseType = HttpResponse<ILogLienThongMotCua[]>;

@Injectable({ providedIn: 'root' })
export class LogLienThongMotCuaService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/log-lien-thong-mot-cuas');

  create(logLienThongMotCua: NewLogLienThongMotCua): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logLienThongMotCua);
    return this.http
      .post<RestLogLienThongMotCua>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(logLienThongMotCua: ILogLienThongMotCua): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logLienThongMotCua);
    return this.http
      .put<RestLogLienThongMotCua>(`${this.resourceUrl}/${this.getLogLienThongMotCuaIdentifier(logLienThongMotCua)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(logLienThongMotCua: PartialUpdateLogLienThongMotCua): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logLienThongMotCua);
    return this.http
      .patch<RestLogLienThongMotCua>(`${this.resourceUrl}/${this.getLogLienThongMotCuaIdentifier(logLienThongMotCua)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestLogLienThongMotCua>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLogLienThongMotCua[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLogLienThongMotCuaIdentifier(logLienThongMotCua: Pick<ILogLienThongMotCua, 'id'>): number {
    return logLienThongMotCua.id;
  }

  compareLogLienThongMotCua(o1: Pick<ILogLienThongMotCua, 'id'> | null, o2: Pick<ILogLienThongMotCua, 'id'> | null): boolean {
    return o1 && o2 ? this.getLogLienThongMotCuaIdentifier(o1) === this.getLogLienThongMotCuaIdentifier(o2) : o1 === o2;
  }

  addLogLienThongMotCuaToCollectionIfMissing<Type extends Pick<ILogLienThongMotCua, 'id'>>(
    logLienThongMotCuaCollection: Type[],
    ...logLienThongMotCuasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const logLienThongMotCuas: Type[] = logLienThongMotCuasToCheck.filter(isPresent);
    if (logLienThongMotCuas.length > 0) {
      const logLienThongMotCuaCollectionIdentifiers = logLienThongMotCuaCollection.map(logLienThongMotCuaItem =>
        this.getLogLienThongMotCuaIdentifier(logLienThongMotCuaItem),
      );
      const logLienThongMotCuasToAdd = logLienThongMotCuas.filter(logLienThongMotCuaItem => {
        const logLienThongMotCuaIdentifier = this.getLogLienThongMotCuaIdentifier(logLienThongMotCuaItem);
        if (logLienThongMotCuaCollectionIdentifiers.includes(logLienThongMotCuaIdentifier)) {
          return false;
        }
        logLienThongMotCuaCollectionIdentifiers.push(logLienThongMotCuaIdentifier);
        return true;
      });
      return [...logLienThongMotCuasToAdd, ...logLienThongMotCuaCollection];
    }
    return logLienThongMotCuaCollection;
  }

  protected convertDateFromClient<T extends ILogLienThongMotCua | NewLogLienThongMotCua | PartialUpdateLogLienThongMotCua>(
    logLienThongMotCua: T,
  ): RestOf<T> {
    return {
      ...logLienThongMotCua,
      ngayThaoTac: logLienThongMotCua.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restLogLienThongMotCua: RestLogLienThongMotCua): ILogLienThongMotCua {
    return {
      ...restLogLienThongMotCua,
      ngayThaoTac: restLogLienThongMotCua.ngayThaoTac ? dayjs(restLogLienThongMotCua.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLogLienThongMotCua>): HttpResponse<ILogLienThongMotCua> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLogLienThongMotCua[]>): HttpResponse<ILogLienThongMotCua[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
