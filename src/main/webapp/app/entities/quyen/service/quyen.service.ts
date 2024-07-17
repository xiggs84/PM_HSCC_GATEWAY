import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuyen, NewQuyen } from '../quyen.model';

export type PartialUpdateQuyen = Partial<IQuyen> & Pick<IQuyen, 'id'>;

export type EntityResponseType = HttpResponse<IQuyen>;
export type EntityArrayResponseType = HttpResponse<IQuyen[]>;

@Injectable({ providedIn: 'root' })
export class QuyenService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quyens');

  create(quyen: NewQuyen): Observable<EntityResponseType> {
    return this.http.post<IQuyen>(this.resourceUrl, quyen, { observe: 'response' });
  }

  update(quyen: IQuyen): Observable<EntityResponseType> {
    return this.http.put<IQuyen>(`${this.resourceUrl}/${this.getQuyenIdentifier(quyen)}`, quyen, { observe: 'response' });
  }

  partialUpdate(quyen: PartialUpdateQuyen): Observable<EntityResponseType> {
    return this.http.patch<IQuyen>(`${this.resourceUrl}/${this.getQuyenIdentifier(quyen)}`, quyen, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuyen>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuyen[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getQuyenIdentifier(quyen: Pick<IQuyen, 'id'>): number {
    return quyen.id;
  }

  compareQuyen(o1: Pick<IQuyen, 'id'> | null, o2: Pick<IQuyen, 'id'> | null): boolean {
    return o1 && o2 ? this.getQuyenIdentifier(o1) === this.getQuyenIdentifier(o2) : o1 === o2;
  }

  addQuyenToCollectionIfMissing<Type extends Pick<IQuyen, 'id'>>(
    quyenCollection: Type[],
    ...quyensToCheck: (Type | null | undefined)[]
  ): Type[] {
    const quyens: Type[] = quyensToCheck.filter(isPresent);
    if (quyens.length > 0) {
      const quyenCollectionIdentifiers = quyenCollection.map(quyenItem => this.getQuyenIdentifier(quyenItem));
      const quyensToAdd = quyens.filter(quyenItem => {
        const quyenIdentifier = this.getQuyenIdentifier(quyenItem);
        if (quyenCollectionIdentifiers.includes(quyenIdentifier)) {
          return false;
        }
        quyenCollectionIdentifiers.push(quyenIdentifier);
        return true;
      });
      return [...quyensToAdd, ...quyenCollection];
    }
    return quyenCollection;
  }
}
