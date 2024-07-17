import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucFaq, NewDanhMucFaq } from '../danh-muc-faq.model';

export type PartialUpdateDanhMucFaq = Partial<IDanhMucFaq> & Pick<IDanhMucFaq, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucFaq>;
export type EntityArrayResponseType = HttpResponse<IDanhMucFaq[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucFaqService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-faqs');

  create(danhMucFaq: NewDanhMucFaq): Observable<EntityResponseType> {
    return this.http.post<IDanhMucFaq>(this.resourceUrl, danhMucFaq, { observe: 'response' });
  }

  update(danhMucFaq: IDanhMucFaq): Observable<EntityResponseType> {
    return this.http.put<IDanhMucFaq>(`${this.resourceUrl}/${this.getDanhMucFaqIdentifier(danhMucFaq)}`, danhMucFaq, {
      observe: 'response',
    });
  }

  partialUpdate(danhMucFaq: PartialUpdateDanhMucFaq): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucFaq>(`${this.resourceUrl}/${this.getDanhMucFaqIdentifier(danhMucFaq)}`, danhMucFaq, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucFaq>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucFaq[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucFaqIdentifier(danhMucFaq: Pick<IDanhMucFaq, 'id'>): number {
    return danhMucFaq.id;
  }

  compareDanhMucFaq(o1: Pick<IDanhMucFaq, 'id'> | null, o2: Pick<IDanhMucFaq, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucFaqIdentifier(o1) === this.getDanhMucFaqIdentifier(o2) : o1 === o2;
  }

  addDanhMucFaqToCollectionIfMissing<Type extends Pick<IDanhMucFaq, 'id'>>(
    danhMucFaqCollection: Type[],
    ...danhMucFaqsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucFaqs: Type[] = danhMucFaqsToCheck.filter(isPresent);
    if (danhMucFaqs.length > 0) {
      const danhMucFaqCollectionIdentifiers = danhMucFaqCollection.map(danhMucFaqItem => this.getDanhMucFaqIdentifier(danhMucFaqItem));
      const danhMucFaqsToAdd = danhMucFaqs.filter(danhMucFaqItem => {
        const danhMucFaqIdentifier = this.getDanhMucFaqIdentifier(danhMucFaqItem);
        if (danhMucFaqCollectionIdentifiers.includes(danhMucFaqIdentifier)) {
          return false;
        }
        danhMucFaqCollectionIdentifiers.push(danhMucFaqIdentifier);
        return true;
      });
      return [...danhMucFaqsToAdd, ...danhMucFaqCollection];
    }
    return danhMucFaqCollection;
  }
}
