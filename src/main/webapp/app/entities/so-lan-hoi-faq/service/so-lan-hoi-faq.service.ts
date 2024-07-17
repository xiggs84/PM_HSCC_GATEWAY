import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISoLanHoiFaq, NewSoLanHoiFaq } from '../so-lan-hoi-faq.model';

export type PartialUpdateSoLanHoiFaq = Partial<ISoLanHoiFaq> & Pick<ISoLanHoiFaq, 'id'>;

type RestOf<T extends ISoLanHoiFaq | NewSoLanHoiFaq> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestSoLanHoiFaq = RestOf<ISoLanHoiFaq>;

export type NewRestSoLanHoiFaq = RestOf<NewSoLanHoiFaq>;

export type PartialUpdateRestSoLanHoiFaq = RestOf<PartialUpdateSoLanHoiFaq>;

export type EntityResponseType = HttpResponse<ISoLanHoiFaq>;
export type EntityArrayResponseType = HttpResponse<ISoLanHoiFaq[]>;

@Injectable({ providedIn: 'root' })
export class SoLanHoiFaqService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/so-lan-hoi-faqs');

  create(soLanHoiFaq: NewSoLanHoiFaq): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(soLanHoiFaq);
    return this.http
      .post<RestSoLanHoiFaq>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(soLanHoiFaq: ISoLanHoiFaq): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(soLanHoiFaq);
    return this.http
      .put<RestSoLanHoiFaq>(`${this.resourceUrl}/${this.getSoLanHoiFaqIdentifier(soLanHoiFaq)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(soLanHoiFaq: PartialUpdateSoLanHoiFaq): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(soLanHoiFaq);
    return this.http
      .patch<RestSoLanHoiFaq>(`${this.resourceUrl}/${this.getSoLanHoiFaqIdentifier(soLanHoiFaq)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSoLanHoiFaq>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSoLanHoiFaq[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSoLanHoiFaqIdentifier(soLanHoiFaq: Pick<ISoLanHoiFaq, 'id'>): number {
    return soLanHoiFaq.id;
  }

  compareSoLanHoiFaq(o1: Pick<ISoLanHoiFaq, 'id'> | null, o2: Pick<ISoLanHoiFaq, 'id'> | null): boolean {
    return o1 && o2 ? this.getSoLanHoiFaqIdentifier(o1) === this.getSoLanHoiFaqIdentifier(o2) : o1 === o2;
  }

  addSoLanHoiFaqToCollectionIfMissing<Type extends Pick<ISoLanHoiFaq, 'id'>>(
    soLanHoiFaqCollection: Type[],
    ...soLanHoiFaqsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const soLanHoiFaqs: Type[] = soLanHoiFaqsToCheck.filter(isPresent);
    if (soLanHoiFaqs.length > 0) {
      const soLanHoiFaqCollectionIdentifiers = soLanHoiFaqCollection.map(soLanHoiFaqItem => this.getSoLanHoiFaqIdentifier(soLanHoiFaqItem));
      const soLanHoiFaqsToAdd = soLanHoiFaqs.filter(soLanHoiFaqItem => {
        const soLanHoiFaqIdentifier = this.getSoLanHoiFaqIdentifier(soLanHoiFaqItem);
        if (soLanHoiFaqCollectionIdentifiers.includes(soLanHoiFaqIdentifier)) {
          return false;
        }
        soLanHoiFaqCollectionIdentifiers.push(soLanHoiFaqIdentifier);
        return true;
      });
      return [...soLanHoiFaqsToAdd, ...soLanHoiFaqCollection];
    }
    return soLanHoiFaqCollection;
  }

  protected convertDateFromClient<T extends ISoLanHoiFaq | NewSoLanHoiFaq | PartialUpdateSoLanHoiFaq>(soLanHoiFaq: T): RestOf<T> {
    return {
      ...soLanHoiFaq,
      ngayThaoTac: soLanHoiFaq.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restSoLanHoiFaq: RestSoLanHoiFaq): ISoLanHoiFaq {
    return {
      ...restSoLanHoiFaq,
      ngayThaoTac: restSoLanHoiFaq.ngayThaoTac ? dayjs(restSoLanHoiFaq.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSoLanHoiFaq>): HttpResponse<ISoLanHoiFaq> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSoLanHoiFaq[]>): HttpResponse<ISoLanHoiFaq[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
