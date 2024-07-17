import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILichSuGiaoDich, NewLichSuGiaoDich } from '../lich-su-giao-dich.model';

export type PartialUpdateLichSuGiaoDich = Partial<ILichSuGiaoDich> & Pick<ILichSuGiaoDich, 'id'>;

type RestOf<T extends ILichSuGiaoDich | NewLichSuGiaoDich> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestLichSuGiaoDich = RestOf<ILichSuGiaoDich>;

export type NewRestLichSuGiaoDich = RestOf<NewLichSuGiaoDich>;

export type PartialUpdateRestLichSuGiaoDich = RestOf<PartialUpdateLichSuGiaoDich>;

export type EntityResponseType = HttpResponse<ILichSuGiaoDich>;
export type EntityArrayResponseType = HttpResponse<ILichSuGiaoDich[]>;

@Injectable({ providedIn: 'root' })
export class LichSuGiaoDichService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lich-su-giao-diches');

  create(lichSuGiaoDich: NewLichSuGiaoDich): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lichSuGiaoDich);
    return this.http
      .post<RestLichSuGiaoDich>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(lichSuGiaoDich: ILichSuGiaoDich): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lichSuGiaoDich);
    return this.http
      .put<RestLichSuGiaoDich>(`${this.resourceUrl}/${this.getLichSuGiaoDichIdentifier(lichSuGiaoDich)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(lichSuGiaoDich: PartialUpdateLichSuGiaoDich): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lichSuGiaoDich);
    return this.http
      .patch<RestLichSuGiaoDich>(`${this.resourceUrl}/${this.getLichSuGiaoDichIdentifier(lichSuGiaoDich)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestLichSuGiaoDich>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLichSuGiaoDich[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLichSuGiaoDichIdentifier(lichSuGiaoDich: Pick<ILichSuGiaoDich, 'id'>): number {
    return lichSuGiaoDich.id;
  }

  compareLichSuGiaoDich(o1: Pick<ILichSuGiaoDich, 'id'> | null, o2: Pick<ILichSuGiaoDich, 'id'> | null): boolean {
    return o1 && o2 ? this.getLichSuGiaoDichIdentifier(o1) === this.getLichSuGiaoDichIdentifier(o2) : o1 === o2;
  }

  addLichSuGiaoDichToCollectionIfMissing<Type extends Pick<ILichSuGiaoDich, 'id'>>(
    lichSuGiaoDichCollection: Type[],
    ...lichSuGiaoDichesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const lichSuGiaoDiches: Type[] = lichSuGiaoDichesToCheck.filter(isPresent);
    if (lichSuGiaoDiches.length > 0) {
      const lichSuGiaoDichCollectionIdentifiers = lichSuGiaoDichCollection.map(lichSuGiaoDichItem =>
        this.getLichSuGiaoDichIdentifier(lichSuGiaoDichItem),
      );
      const lichSuGiaoDichesToAdd = lichSuGiaoDiches.filter(lichSuGiaoDichItem => {
        const lichSuGiaoDichIdentifier = this.getLichSuGiaoDichIdentifier(lichSuGiaoDichItem);
        if (lichSuGiaoDichCollectionIdentifiers.includes(lichSuGiaoDichIdentifier)) {
          return false;
        }
        lichSuGiaoDichCollectionIdentifiers.push(lichSuGiaoDichIdentifier);
        return true;
      });
      return [...lichSuGiaoDichesToAdd, ...lichSuGiaoDichCollection];
    }
    return lichSuGiaoDichCollection;
  }

  protected convertDateFromClient<T extends ILichSuGiaoDich | NewLichSuGiaoDich | PartialUpdateLichSuGiaoDich>(
    lichSuGiaoDich: T,
  ): RestOf<T> {
    return {
      ...lichSuGiaoDich,
      ngayThaoTac: lichSuGiaoDich.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restLichSuGiaoDich: RestLichSuGiaoDich): ILichSuGiaoDich {
    return {
      ...restLichSuGiaoDich,
      ngayThaoTac: restLichSuGiaoDich.ngayThaoTac ? dayjs(restLichSuGiaoDich.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLichSuGiaoDich>): HttpResponse<ILichSuGiaoDich> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLichSuGiaoDich[]>): HttpResponse<ILichSuGiaoDich[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
