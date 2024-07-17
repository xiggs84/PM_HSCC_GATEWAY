import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucKeyDongTuFaq, NewDanhMucKeyDongTuFaq } from '../danh-muc-key-dong-tu-faq.model';

export type PartialUpdateDanhMucKeyDongTuFaq = Partial<IDanhMucKeyDongTuFaq> & Pick<IDanhMucKeyDongTuFaq, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucKeyDongTuFaq>;
export type EntityArrayResponseType = HttpResponse<IDanhMucKeyDongTuFaq[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucKeyDongTuFaqService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-key-dong-tu-faqs');

  create(danhMucKeyDongTuFaq: NewDanhMucKeyDongTuFaq): Observable<EntityResponseType> {
    return this.http.post<IDanhMucKeyDongTuFaq>(this.resourceUrl, danhMucKeyDongTuFaq, { observe: 'response' });
  }

  update(danhMucKeyDongTuFaq: IDanhMucKeyDongTuFaq): Observable<EntityResponseType> {
    return this.http.put<IDanhMucKeyDongTuFaq>(
      `${this.resourceUrl}/${this.getDanhMucKeyDongTuFaqIdentifier(danhMucKeyDongTuFaq)}`,
      danhMucKeyDongTuFaq,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucKeyDongTuFaq: PartialUpdateDanhMucKeyDongTuFaq): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucKeyDongTuFaq>(
      `${this.resourceUrl}/${this.getDanhMucKeyDongTuFaqIdentifier(danhMucKeyDongTuFaq)}`,
      danhMucKeyDongTuFaq,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucKeyDongTuFaq>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucKeyDongTuFaq[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucKeyDongTuFaqIdentifier(danhMucKeyDongTuFaq: Pick<IDanhMucKeyDongTuFaq, 'id'>): number {
    return danhMucKeyDongTuFaq.id;
  }

  compareDanhMucKeyDongTuFaq(o1: Pick<IDanhMucKeyDongTuFaq, 'id'> | null, o2: Pick<IDanhMucKeyDongTuFaq, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucKeyDongTuFaqIdentifier(o1) === this.getDanhMucKeyDongTuFaqIdentifier(o2) : o1 === o2;
  }

  addDanhMucKeyDongTuFaqToCollectionIfMissing<Type extends Pick<IDanhMucKeyDongTuFaq, 'id'>>(
    danhMucKeyDongTuFaqCollection: Type[],
    ...danhMucKeyDongTuFaqsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucKeyDongTuFaqs: Type[] = danhMucKeyDongTuFaqsToCheck.filter(isPresent);
    if (danhMucKeyDongTuFaqs.length > 0) {
      const danhMucKeyDongTuFaqCollectionIdentifiers = danhMucKeyDongTuFaqCollection.map(danhMucKeyDongTuFaqItem =>
        this.getDanhMucKeyDongTuFaqIdentifier(danhMucKeyDongTuFaqItem),
      );
      const danhMucKeyDongTuFaqsToAdd = danhMucKeyDongTuFaqs.filter(danhMucKeyDongTuFaqItem => {
        const danhMucKeyDongTuFaqIdentifier = this.getDanhMucKeyDongTuFaqIdentifier(danhMucKeyDongTuFaqItem);
        if (danhMucKeyDongTuFaqCollectionIdentifiers.includes(danhMucKeyDongTuFaqIdentifier)) {
          return false;
        }
        danhMucKeyDongTuFaqCollectionIdentifiers.push(danhMucKeyDongTuFaqIdentifier);
        return true;
      });
      return [...danhMucKeyDongTuFaqsToAdd, ...danhMucKeyDongTuFaqCollection];
    }
    return danhMucKeyDongTuFaqCollection;
  }
}
