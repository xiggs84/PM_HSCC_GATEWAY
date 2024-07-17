import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILogSearchDsTs, NewLogSearchDsTs } from '../log-search-ds-ts.model';

export type PartialUpdateLogSearchDsTs = Partial<ILogSearchDsTs> & Pick<ILogSearchDsTs, 'id'>;

type RestOf<T extends ILogSearchDsTs | NewLogSearchDsTs> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestLogSearchDsTs = RestOf<ILogSearchDsTs>;

export type NewRestLogSearchDsTs = RestOf<NewLogSearchDsTs>;

export type PartialUpdateRestLogSearchDsTs = RestOf<PartialUpdateLogSearchDsTs>;

export type EntityResponseType = HttpResponse<ILogSearchDsTs>;
export type EntityArrayResponseType = HttpResponse<ILogSearchDsTs[]>;

@Injectable({ providedIn: 'root' })
export class LogSearchDsTsService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/log-search-ds-ts');

  create(logSearchDsTs: NewLogSearchDsTs): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logSearchDsTs);
    return this.http
      .post<RestLogSearchDsTs>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(logSearchDsTs: ILogSearchDsTs): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logSearchDsTs);
    return this.http
      .put<RestLogSearchDsTs>(`${this.resourceUrl}/${this.getLogSearchDsTsIdentifier(logSearchDsTs)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(logSearchDsTs: PartialUpdateLogSearchDsTs): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logSearchDsTs);
    return this.http
      .patch<RestLogSearchDsTs>(`${this.resourceUrl}/${this.getLogSearchDsTsIdentifier(logSearchDsTs)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestLogSearchDsTs>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLogSearchDsTs[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLogSearchDsTsIdentifier(logSearchDsTs: Pick<ILogSearchDsTs, 'id'>): number {
    return logSearchDsTs.id;
  }

  compareLogSearchDsTs(o1: Pick<ILogSearchDsTs, 'id'> | null, o2: Pick<ILogSearchDsTs, 'id'> | null): boolean {
    return o1 && o2 ? this.getLogSearchDsTsIdentifier(o1) === this.getLogSearchDsTsIdentifier(o2) : o1 === o2;
  }

  addLogSearchDsTsToCollectionIfMissing<Type extends Pick<ILogSearchDsTs, 'id'>>(
    logSearchDsTsCollection: Type[],
    ...logSearchDsTsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const logSearchDsTs: Type[] = logSearchDsTsToCheck.filter(isPresent);
    if (logSearchDsTs.length > 0) {
      const logSearchDsTsCollectionIdentifiers = logSearchDsTsCollection.map(logSearchDsTsItem =>
        this.getLogSearchDsTsIdentifier(logSearchDsTsItem),
      );
      const logSearchDsTsToAdd = logSearchDsTs.filter(logSearchDsTsItem => {
        const logSearchDsTsIdentifier = this.getLogSearchDsTsIdentifier(logSearchDsTsItem);
        if (logSearchDsTsCollectionIdentifiers.includes(logSearchDsTsIdentifier)) {
          return false;
        }
        logSearchDsTsCollectionIdentifiers.push(logSearchDsTsIdentifier);
        return true;
      });
      return [...logSearchDsTsToAdd, ...logSearchDsTsCollection];
    }
    return logSearchDsTsCollection;
  }

  protected convertDateFromClient<T extends ILogSearchDsTs | NewLogSearchDsTs | PartialUpdateLogSearchDsTs>(logSearchDsTs: T): RestOf<T> {
    return {
      ...logSearchDsTs,
      ngayThaoTac: logSearchDsTs.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restLogSearchDsTs: RestLogSearchDsTs): ILogSearchDsTs {
    return {
      ...restLogSearchDsTs,
      ngayThaoTac: restLogSearchDsTs.ngayThaoTac ? dayjs(restLogSearchDsTs.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLogSearchDsTs>): HttpResponse<ILogSearchDsTs> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLogSearchDsTs[]>): HttpResponse<ILogSearchDsTs[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
