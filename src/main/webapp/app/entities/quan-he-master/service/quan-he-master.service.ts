import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuanHeMaster, NewQuanHeMaster } from '../quan-he-master.model';

export type PartialUpdateQuanHeMaster = Partial<IQuanHeMaster> & Pick<IQuanHeMaster, 'id'>;

export type EntityResponseType = HttpResponse<IQuanHeMaster>;
export type EntityArrayResponseType = HttpResponse<IQuanHeMaster[]>;

@Injectable({ providedIn: 'root' })
export class QuanHeMasterService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quan-he-masters');

  create(quanHeMaster: NewQuanHeMaster): Observable<EntityResponseType> {
    return this.http.post<IQuanHeMaster>(this.resourceUrl, quanHeMaster, { observe: 'response' });
  }

  update(quanHeMaster: IQuanHeMaster): Observable<EntityResponseType> {
    return this.http.put<IQuanHeMaster>(`${this.resourceUrl}/${this.getQuanHeMasterIdentifier(quanHeMaster)}`, quanHeMaster, {
      observe: 'response',
    });
  }

  partialUpdate(quanHeMaster: PartialUpdateQuanHeMaster): Observable<EntityResponseType> {
    return this.http.patch<IQuanHeMaster>(`${this.resourceUrl}/${this.getQuanHeMasterIdentifier(quanHeMaster)}`, quanHeMaster, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuanHeMaster>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuanHeMaster[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getQuanHeMasterIdentifier(quanHeMaster: Pick<IQuanHeMaster, 'id'>): number {
    return quanHeMaster.id;
  }

  compareQuanHeMaster(o1: Pick<IQuanHeMaster, 'id'> | null, o2: Pick<IQuanHeMaster, 'id'> | null): boolean {
    return o1 && o2 ? this.getQuanHeMasterIdentifier(o1) === this.getQuanHeMasterIdentifier(o2) : o1 === o2;
  }

  addQuanHeMasterToCollectionIfMissing<Type extends Pick<IQuanHeMaster, 'id'>>(
    quanHeMasterCollection: Type[],
    ...quanHeMastersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const quanHeMasters: Type[] = quanHeMastersToCheck.filter(isPresent);
    if (quanHeMasters.length > 0) {
      const quanHeMasterCollectionIdentifiers = quanHeMasterCollection.map(quanHeMasterItem =>
        this.getQuanHeMasterIdentifier(quanHeMasterItem),
      );
      const quanHeMastersToAdd = quanHeMasters.filter(quanHeMasterItem => {
        const quanHeMasterIdentifier = this.getQuanHeMasterIdentifier(quanHeMasterItem);
        if (quanHeMasterCollectionIdentifiers.includes(quanHeMasterIdentifier)) {
          return false;
        }
        quanHeMasterCollectionIdentifiers.push(quanHeMasterIdentifier);
        return true;
      });
      return [...quanHeMastersToAdd, ...quanHeMasterCollection];
    }
    return quanHeMasterCollection;
  }
}
