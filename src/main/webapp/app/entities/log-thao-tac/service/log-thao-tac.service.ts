import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILogThaoTac, NewLogThaoTac } from '../log-thao-tac.model';

export type PartialUpdateLogThaoTac = Partial<ILogThaoTac> & Pick<ILogThaoTac, 'id'>;

type RestOf<T extends ILogThaoTac | NewLogThaoTac> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestLogThaoTac = RestOf<ILogThaoTac>;

export type NewRestLogThaoTac = RestOf<NewLogThaoTac>;

export type PartialUpdateRestLogThaoTac = RestOf<PartialUpdateLogThaoTac>;

export type EntityResponseType = HttpResponse<ILogThaoTac>;
export type EntityArrayResponseType = HttpResponse<ILogThaoTac[]>;

@Injectable({ providedIn: 'root' })
export class LogThaoTacService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/log-thao-tacs');

  create(logThaoTac: NewLogThaoTac): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logThaoTac);
    return this.http
      .post<RestLogThaoTac>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(logThaoTac: ILogThaoTac): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logThaoTac);
    return this.http
      .put<RestLogThaoTac>(`${this.resourceUrl}/${this.getLogThaoTacIdentifier(logThaoTac)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(logThaoTac: PartialUpdateLogThaoTac): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logThaoTac);
    return this.http
      .patch<RestLogThaoTac>(`${this.resourceUrl}/${this.getLogThaoTacIdentifier(logThaoTac)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestLogThaoTac>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLogThaoTac[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLogThaoTacIdentifier(logThaoTac: Pick<ILogThaoTac, 'id'>): number {
    return logThaoTac.id;
  }

  compareLogThaoTac(o1: Pick<ILogThaoTac, 'id'> | null, o2: Pick<ILogThaoTac, 'id'> | null): boolean {
    return o1 && o2 ? this.getLogThaoTacIdentifier(o1) === this.getLogThaoTacIdentifier(o2) : o1 === o2;
  }

  addLogThaoTacToCollectionIfMissing<Type extends Pick<ILogThaoTac, 'id'>>(
    logThaoTacCollection: Type[],
    ...logThaoTacsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const logThaoTacs: Type[] = logThaoTacsToCheck.filter(isPresent);
    if (logThaoTacs.length > 0) {
      const logThaoTacCollectionIdentifiers = logThaoTacCollection.map(logThaoTacItem => this.getLogThaoTacIdentifier(logThaoTacItem));
      const logThaoTacsToAdd = logThaoTacs.filter(logThaoTacItem => {
        const logThaoTacIdentifier = this.getLogThaoTacIdentifier(logThaoTacItem);
        if (logThaoTacCollectionIdentifiers.includes(logThaoTacIdentifier)) {
          return false;
        }
        logThaoTacCollectionIdentifiers.push(logThaoTacIdentifier);
        return true;
      });
      return [...logThaoTacsToAdd, ...logThaoTacCollection];
    }
    return logThaoTacCollection;
  }

  protected convertDateFromClient<T extends ILogThaoTac | NewLogThaoTac | PartialUpdateLogThaoTac>(logThaoTac: T): RestOf<T> {
    return {
      ...logThaoTac,
      ngayThaoTac: logThaoTac.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restLogThaoTac: RestLogThaoTac): ILogThaoTac {
    return {
      ...restLogThaoTac,
      ngayThaoTac: restLogThaoTac.ngayThaoTac ? dayjs(restLogThaoTac.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLogThaoTac>): HttpResponse<ILogThaoTac> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLogThaoTac[]>): HttpResponse<ILogThaoTac[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
