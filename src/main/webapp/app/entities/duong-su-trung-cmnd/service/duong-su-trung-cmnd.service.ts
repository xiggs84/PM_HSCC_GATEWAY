import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDuongSuTrungCmnd, NewDuongSuTrungCmnd } from '../duong-su-trung-cmnd.model';

export type PartialUpdateDuongSuTrungCmnd = Partial<IDuongSuTrungCmnd> & Pick<IDuongSuTrungCmnd, 'id'>;

type RestOf<T extends IDuongSuTrungCmnd | NewDuongSuTrungCmnd> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestDuongSuTrungCmnd = RestOf<IDuongSuTrungCmnd>;

export type NewRestDuongSuTrungCmnd = RestOf<NewDuongSuTrungCmnd>;

export type PartialUpdateRestDuongSuTrungCmnd = RestOf<PartialUpdateDuongSuTrungCmnd>;

export type EntityResponseType = HttpResponse<IDuongSuTrungCmnd>;
export type EntityArrayResponseType = HttpResponse<IDuongSuTrungCmnd[]>;

@Injectable({ providedIn: 'root' })
export class DuongSuTrungCmndService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/duong-su-trung-cmnds');

  create(duongSuTrungCmnd: NewDuongSuTrungCmnd): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(duongSuTrungCmnd);
    return this.http
      .post<RestDuongSuTrungCmnd>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(duongSuTrungCmnd: IDuongSuTrungCmnd): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(duongSuTrungCmnd);
    return this.http
      .put<RestDuongSuTrungCmnd>(`${this.resourceUrl}/${this.getDuongSuTrungCmndIdentifier(duongSuTrungCmnd)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(duongSuTrungCmnd: PartialUpdateDuongSuTrungCmnd): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(duongSuTrungCmnd);
    return this.http
      .patch<RestDuongSuTrungCmnd>(`${this.resourceUrl}/${this.getDuongSuTrungCmndIdentifier(duongSuTrungCmnd)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDuongSuTrungCmnd>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDuongSuTrungCmnd[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDuongSuTrungCmndIdentifier(duongSuTrungCmnd: Pick<IDuongSuTrungCmnd, 'id'>): number {
    return duongSuTrungCmnd.id;
  }

  compareDuongSuTrungCmnd(o1: Pick<IDuongSuTrungCmnd, 'id'> | null, o2: Pick<IDuongSuTrungCmnd, 'id'> | null): boolean {
    return o1 && o2 ? this.getDuongSuTrungCmndIdentifier(o1) === this.getDuongSuTrungCmndIdentifier(o2) : o1 === o2;
  }

  addDuongSuTrungCmndToCollectionIfMissing<Type extends Pick<IDuongSuTrungCmnd, 'id'>>(
    duongSuTrungCmndCollection: Type[],
    ...duongSuTrungCmndsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const duongSuTrungCmnds: Type[] = duongSuTrungCmndsToCheck.filter(isPresent);
    if (duongSuTrungCmnds.length > 0) {
      const duongSuTrungCmndCollectionIdentifiers = duongSuTrungCmndCollection.map(duongSuTrungCmndItem =>
        this.getDuongSuTrungCmndIdentifier(duongSuTrungCmndItem),
      );
      const duongSuTrungCmndsToAdd = duongSuTrungCmnds.filter(duongSuTrungCmndItem => {
        const duongSuTrungCmndIdentifier = this.getDuongSuTrungCmndIdentifier(duongSuTrungCmndItem);
        if (duongSuTrungCmndCollectionIdentifiers.includes(duongSuTrungCmndIdentifier)) {
          return false;
        }
        duongSuTrungCmndCollectionIdentifiers.push(duongSuTrungCmndIdentifier);
        return true;
      });
      return [...duongSuTrungCmndsToAdd, ...duongSuTrungCmndCollection];
    }
    return duongSuTrungCmndCollection;
  }

  protected convertDateFromClient<T extends IDuongSuTrungCmnd | NewDuongSuTrungCmnd | PartialUpdateDuongSuTrungCmnd>(
    duongSuTrungCmnd: T,
  ): RestOf<T> {
    return {
      ...duongSuTrungCmnd,
      ngayThaoTac: duongSuTrungCmnd.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDuongSuTrungCmnd: RestDuongSuTrungCmnd): IDuongSuTrungCmnd {
    return {
      ...restDuongSuTrungCmnd,
      ngayThaoTac: restDuongSuTrungCmnd.ngayThaoTac ? dayjs(restDuongSuTrungCmnd.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDuongSuTrungCmnd>): HttpResponse<IDuongSuTrungCmnd> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDuongSuTrungCmnd[]>): HttpResponse<IDuongSuTrungCmnd[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
