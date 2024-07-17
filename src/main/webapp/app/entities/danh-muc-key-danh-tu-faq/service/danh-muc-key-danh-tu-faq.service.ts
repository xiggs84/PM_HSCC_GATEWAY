import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucKeyDanhTuFaq, NewDanhMucKeyDanhTuFaq } from '../danh-muc-key-danh-tu-faq.model';

export type PartialUpdateDanhMucKeyDanhTuFaq = Partial<IDanhMucKeyDanhTuFaq> & Pick<IDanhMucKeyDanhTuFaq, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucKeyDanhTuFaq>;
export type EntityArrayResponseType = HttpResponse<IDanhMucKeyDanhTuFaq[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucKeyDanhTuFaqService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-key-danh-tu-faqs');

  create(danhMucKeyDanhTuFaq: NewDanhMucKeyDanhTuFaq): Observable<EntityResponseType> {
    return this.http.post<IDanhMucKeyDanhTuFaq>(this.resourceUrl, danhMucKeyDanhTuFaq, { observe: 'response' });
  }

  update(danhMucKeyDanhTuFaq: IDanhMucKeyDanhTuFaq): Observable<EntityResponseType> {
    return this.http.put<IDanhMucKeyDanhTuFaq>(
      `${this.resourceUrl}/${this.getDanhMucKeyDanhTuFaqIdentifier(danhMucKeyDanhTuFaq)}`,
      danhMucKeyDanhTuFaq,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucKeyDanhTuFaq: PartialUpdateDanhMucKeyDanhTuFaq): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucKeyDanhTuFaq>(
      `${this.resourceUrl}/${this.getDanhMucKeyDanhTuFaqIdentifier(danhMucKeyDanhTuFaq)}`,
      danhMucKeyDanhTuFaq,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucKeyDanhTuFaq>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucKeyDanhTuFaq[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucKeyDanhTuFaqIdentifier(danhMucKeyDanhTuFaq: Pick<IDanhMucKeyDanhTuFaq, 'id'>): number {
    return danhMucKeyDanhTuFaq.id;
  }

  compareDanhMucKeyDanhTuFaq(o1: Pick<IDanhMucKeyDanhTuFaq, 'id'> | null, o2: Pick<IDanhMucKeyDanhTuFaq, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucKeyDanhTuFaqIdentifier(o1) === this.getDanhMucKeyDanhTuFaqIdentifier(o2) : o1 === o2;
  }

  addDanhMucKeyDanhTuFaqToCollectionIfMissing<Type extends Pick<IDanhMucKeyDanhTuFaq, 'id'>>(
    danhMucKeyDanhTuFaqCollection: Type[],
    ...danhMucKeyDanhTuFaqsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucKeyDanhTuFaqs: Type[] = danhMucKeyDanhTuFaqsToCheck.filter(isPresent);
    if (danhMucKeyDanhTuFaqs.length > 0) {
      const danhMucKeyDanhTuFaqCollectionIdentifiers = danhMucKeyDanhTuFaqCollection.map(danhMucKeyDanhTuFaqItem =>
        this.getDanhMucKeyDanhTuFaqIdentifier(danhMucKeyDanhTuFaqItem),
      );
      const danhMucKeyDanhTuFaqsToAdd = danhMucKeyDanhTuFaqs.filter(danhMucKeyDanhTuFaqItem => {
        const danhMucKeyDanhTuFaqIdentifier = this.getDanhMucKeyDanhTuFaqIdentifier(danhMucKeyDanhTuFaqItem);
        if (danhMucKeyDanhTuFaqCollectionIdentifiers.includes(danhMucKeyDanhTuFaqIdentifier)) {
          return false;
        }
        danhMucKeyDanhTuFaqCollectionIdentifiers.push(danhMucKeyDanhTuFaqIdentifier);
        return true;
      });
      return [...danhMucKeyDanhTuFaqsToAdd, ...danhMucKeyDanhTuFaqCollection];
    }
    return danhMucKeyDanhTuFaqCollection;
  }
}
