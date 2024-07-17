import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuanHeNhanThan, NewQuanHeNhanThan } from '../quan-he-nhan-than.model';

export type PartialUpdateQuanHeNhanThan = Partial<IQuanHeNhanThan> & Pick<IQuanHeNhanThan, 'id'>;

export type EntityResponseType = HttpResponse<IQuanHeNhanThan>;
export type EntityArrayResponseType = HttpResponse<IQuanHeNhanThan[]>;

@Injectable({ providedIn: 'root' })
export class QuanHeNhanThanService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quan-he-nhan-thans');

  create(quanHeNhanThan: NewQuanHeNhanThan): Observable<EntityResponseType> {
    return this.http.post<IQuanHeNhanThan>(this.resourceUrl, quanHeNhanThan, { observe: 'response' });
  }

  update(quanHeNhanThan: IQuanHeNhanThan): Observable<EntityResponseType> {
    return this.http.put<IQuanHeNhanThan>(`${this.resourceUrl}/${this.getQuanHeNhanThanIdentifier(quanHeNhanThan)}`, quanHeNhanThan, {
      observe: 'response',
    });
  }

  partialUpdate(quanHeNhanThan: PartialUpdateQuanHeNhanThan): Observable<EntityResponseType> {
    return this.http.patch<IQuanHeNhanThan>(`${this.resourceUrl}/${this.getQuanHeNhanThanIdentifier(quanHeNhanThan)}`, quanHeNhanThan, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuanHeNhanThan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuanHeNhanThan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getQuanHeNhanThanIdentifier(quanHeNhanThan: Pick<IQuanHeNhanThan, 'id'>): number {
    return quanHeNhanThan.id;
  }

  compareQuanHeNhanThan(o1: Pick<IQuanHeNhanThan, 'id'> | null, o2: Pick<IQuanHeNhanThan, 'id'> | null): boolean {
    return o1 && o2 ? this.getQuanHeNhanThanIdentifier(o1) === this.getQuanHeNhanThanIdentifier(o2) : o1 === o2;
  }

  addQuanHeNhanThanToCollectionIfMissing<Type extends Pick<IQuanHeNhanThan, 'id'>>(
    quanHeNhanThanCollection: Type[],
    ...quanHeNhanThansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const quanHeNhanThans: Type[] = quanHeNhanThansToCheck.filter(isPresent);
    if (quanHeNhanThans.length > 0) {
      const quanHeNhanThanCollectionIdentifiers = quanHeNhanThanCollection.map(quanHeNhanThanItem =>
        this.getQuanHeNhanThanIdentifier(quanHeNhanThanItem),
      );
      const quanHeNhanThansToAdd = quanHeNhanThans.filter(quanHeNhanThanItem => {
        const quanHeNhanThanIdentifier = this.getQuanHeNhanThanIdentifier(quanHeNhanThanItem);
        if (quanHeNhanThanCollectionIdentifiers.includes(quanHeNhanThanIdentifier)) {
          return false;
        }
        quanHeNhanThanCollectionIdentifiers.push(quanHeNhanThanIdentifier);
        return true;
      });
      return [...quanHeNhanThansToAdd, ...quanHeNhanThanCollection];
    }
    return quanHeNhanThanCollection;
  }
}
