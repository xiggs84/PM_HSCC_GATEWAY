import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISoCongChung, NewSoCongChung } from '../so-cong-chung.model';

export type PartialUpdateSoCongChung = Partial<ISoCongChung> & Pick<ISoCongChung, 'id'>;

type RestOf<T extends ISoCongChung | NewSoCongChung> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestSoCongChung = RestOf<ISoCongChung>;

export type NewRestSoCongChung = RestOf<NewSoCongChung>;

export type PartialUpdateRestSoCongChung = RestOf<PartialUpdateSoCongChung>;

export type EntityResponseType = HttpResponse<ISoCongChung>;
export type EntityArrayResponseType = HttpResponse<ISoCongChung[]>;

@Injectable({ providedIn: 'root' })
export class SoCongChungService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/so-cong-chungs');

  create(soCongChung: NewSoCongChung): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(soCongChung);
    return this.http
      .post<RestSoCongChung>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(soCongChung: ISoCongChung): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(soCongChung);
    return this.http
      .put<RestSoCongChung>(`${this.resourceUrl}/${this.getSoCongChungIdentifier(soCongChung)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(soCongChung: PartialUpdateSoCongChung): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(soCongChung);
    return this.http
      .patch<RestSoCongChung>(`${this.resourceUrl}/${this.getSoCongChungIdentifier(soCongChung)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSoCongChung>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSoCongChung[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSoCongChungIdentifier(soCongChung: Pick<ISoCongChung, 'id'>): number {
    return soCongChung.id;
  }

  compareSoCongChung(o1: Pick<ISoCongChung, 'id'> | null, o2: Pick<ISoCongChung, 'id'> | null): boolean {
    return o1 && o2 ? this.getSoCongChungIdentifier(o1) === this.getSoCongChungIdentifier(o2) : o1 === o2;
  }

  addSoCongChungToCollectionIfMissing<Type extends Pick<ISoCongChung, 'id'>>(
    soCongChungCollection: Type[],
    ...soCongChungsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const soCongChungs: Type[] = soCongChungsToCheck.filter(isPresent);
    if (soCongChungs.length > 0) {
      const soCongChungCollectionIdentifiers = soCongChungCollection.map(soCongChungItem => this.getSoCongChungIdentifier(soCongChungItem));
      const soCongChungsToAdd = soCongChungs.filter(soCongChungItem => {
        const soCongChungIdentifier = this.getSoCongChungIdentifier(soCongChungItem);
        if (soCongChungCollectionIdentifiers.includes(soCongChungIdentifier)) {
          return false;
        }
        soCongChungCollectionIdentifiers.push(soCongChungIdentifier);
        return true;
      });
      return [...soCongChungsToAdd, ...soCongChungCollection];
    }
    return soCongChungCollection;
  }

  protected convertDateFromClient<T extends ISoCongChung | NewSoCongChung | PartialUpdateSoCongChung>(soCongChung: T): RestOf<T> {
    return {
      ...soCongChung,
      ngayThaoTac: soCongChung.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restSoCongChung: RestSoCongChung): ISoCongChung {
    return {
      ...restSoCongChung,
      ngayThaoTac: restSoCongChung.ngayThaoTac ? dayjs(restSoCongChung.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSoCongChung>): HttpResponse<ISoCongChung> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSoCongChung[]>): HttpResponse<ISoCongChung[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
