import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICanBoQuyen, NewCanBoQuyen } from '../can-bo-quyen.model';

export type PartialUpdateCanBoQuyen = Partial<ICanBoQuyen> & Pick<ICanBoQuyen, 'id'>;

export type EntityResponseType = HttpResponse<ICanBoQuyen>;
export type EntityArrayResponseType = HttpResponse<ICanBoQuyen[]>;

@Injectable({ providedIn: 'root' })
export class CanBoQuyenService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/can-bo-quyens');

  create(canBoQuyen: NewCanBoQuyen): Observable<EntityResponseType> {
    return this.http.post<ICanBoQuyen>(this.resourceUrl, canBoQuyen, { observe: 'response' });
  }

  update(canBoQuyen: ICanBoQuyen): Observable<EntityResponseType> {
    return this.http.put<ICanBoQuyen>(`${this.resourceUrl}/${this.getCanBoQuyenIdentifier(canBoQuyen)}`, canBoQuyen, {
      observe: 'response',
    });
  }

  partialUpdate(canBoQuyen: PartialUpdateCanBoQuyen): Observable<EntityResponseType> {
    return this.http.patch<ICanBoQuyen>(`${this.resourceUrl}/${this.getCanBoQuyenIdentifier(canBoQuyen)}`, canBoQuyen, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICanBoQuyen>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICanBoQuyen[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCanBoQuyenIdentifier(canBoQuyen: Pick<ICanBoQuyen, 'id'>): number {
    return canBoQuyen.id;
  }

  compareCanBoQuyen(o1: Pick<ICanBoQuyen, 'id'> | null, o2: Pick<ICanBoQuyen, 'id'> | null): boolean {
    return o1 && o2 ? this.getCanBoQuyenIdentifier(o1) === this.getCanBoQuyenIdentifier(o2) : o1 === o2;
  }

  addCanBoQuyenToCollectionIfMissing<Type extends Pick<ICanBoQuyen, 'id'>>(
    canBoQuyenCollection: Type[],
    ...canBoQuyensToCheck: (Type | null | undefined)[]
  ): Type[] {
    const canBoQuyens: Type[] = canBoQuyensToCheck.filter(isPresent);
    if (canBoQuyens.length > 0) {
      const canBoQuyenCollectionIdentifiers = canBoQuyenCollection.map(canBoQuyenItem => this.getCanBoQuyenIdentifier(canBoQuyenItem));
      const canBoQuyensToAdd = canBoQuyens.filter(canBoQuyenItem => {
        const canBoQuyenIdentifier = this.getCanBoQuyenIdentifier(canBoQuyenItem);
        if (canBoQuyenCollectionIdentifiers.includes(canBoQuyenIdentifier)) {
          return false;
        }
        canBoQuyenCollectionIdentifiers.push(canBoQuyenIdentifier);
        return true;
      });
      return [...canBoQuyensToAdd, ...canBoQuyenCollection];
    }
    return canBoQuyenCollection;
  }
}
