import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDuongSu, NewDuongSu } from '../duong-su.model';

export type PartialUpdateDuongSu = Partial<IDuongSu> & Pick<IDuongSu, 'id'>;

type RestOf<T extends IDuongSu | NewDuongSu> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestDuongSu = RestOf<IDuongSu>;

export type NewRestDuongSu = RestOf<NewDuongSu>;

export type PartialUpdateRestDuongSu = RestOf<PartialUpdateDuongSu>;

export type EntityResponseType = HttpResponse<IDuongSu>;
export type EntityArrayResponseType = HttpResponse<IDuongSu[]>;

@Injectable({ providedIn: 'root' })
export class DuongSuService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/duong-sus');

  create(duongSu: NewDuongSu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(duongSu);
    return this.http
      .post<RestDuongSu>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(duongSu: IDuongSu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(duongSu);
    return this.http
      .put<RestDuongSu>(`${this.resourceUrl}/${this.getDuongSuIdentifier(duongSu)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(duongSu: PartialUpdateDuongSu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(duongSu);
    return this.http
      .patch<RestDuongSu>(`${this.resourceUrl}/${this.getDuongSuIdentifier(duongSu)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDuongSu>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDuongSu[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDuongSuIdentifier(duongSu: Pick<IDuongSu, 'id'>): number {
    return duongSu.id;
  }

  compareDuongSu(o1: Pick<IDuongSu, 'id'> | null, o2: Pick<IDuongSu, 'id'> | null): boolean {
    return o1 && o2 ? this.getDuongSuIdentifier(o1) === this.getDuongSuIdentifier(o2) : o1 === o2;
  }

  addDuongSuToCollectionIfMissing<Type extends Pick<IDuongSu, 'id'>>(
    duongSuCollection: Type[],
    ...duongSusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const duongSus: Type[] = duongSusToCheck.filter(isPresent);
    if (duongSus.length > 0) {
      const duongSuCollectionIdentifiers = duongSuCollection.map(duongSuItem => this.getDuongSuIdentifier(duongSuItem));
      const duongSusToAdd = duongSus.filter(duongSuItem => {
        const duongSuIdentifier = this.getDuongSuIdentifier(duongSuItem);
        if (duongSuCollectionIdentifiers.includes(duongSuIdentifier)) {
          return false;
        }
        duongSuCollectionIdentifiers.push(duongSuIdentifier);
        return true;
      });
      return [...duongSusToAdd, ...duongSuCollection];
    }
    return duongSuCollection;
  }

  protected convertDateFromClient<T extends IDuongSu | NewDuongSu | PartialUpdateDuongSu>(duongSu: T): RestOf<T> {
    return {
      ...duongSu,
      ngayThaoTac: duongSu.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDuongSu: RestDuongSu): IDuongSu {
    return {
      ...restDuongSu,
      ngayThaoTac: restDuongSu.ngayThaoTac ? dayjs(restDuongSu.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDuongSu>): HttpResponse<IDuongSu> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDuongSu[]>): HttpResponse<IDuongSu[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
