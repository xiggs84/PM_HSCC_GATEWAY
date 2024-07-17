import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMenuQuyen, NewMenuQuyen } from '../menu-quyen.model';

export type PartialUpdateMenuQuyen = Partial<IMenuQuyen> & Pick<IMenuQuyen, 'id'>;

export type EntityResponseType = HttpResponse<IMenuQuyen>;
export type EntityArrayResponseType = HttpResponse<IMenuQuyen[]>;

@Injectable({ providedIn: 'root' })
export class MenuQuyenService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/menu-quyens');

  create(menuQuyen: NewMenuQuyen): Observable<EntityResponseType> {
    return this.http.post<IMenuQuyen>(this.resourceUrl, menuQuyen, { observe: 'response' });
  }

  update(menuQuyen: IMenuQuyen): Observable<EntityResponseType> {
    return this.http.put<IMenuQuyen>(`${this.resourceUrl}/${this.getMenuQuyenIdentifier(menuQuyen)}`, menuQuyen, { observe: 'response' });
  }

  partialUpdate(menuQuyen: PartialUpdateMenuQuyen): Observable<EntityResponseType> {
    return this.http.patch<IMenuQuyen>(`${this.resourceUrl}/${this.getMenuQuyenIdentifier(menuQuyen)}`, menuQuyen, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMenuQuyen>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMenuQuyen[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMenuQuyenIdentifier(menuQuyen: Pick<IMenuQuyen, 'id'>): number {
    return menuQuyen.id;
  }

  compareMenuQuyen(o1: Pick<IMenuQuyen, 'id'> | null, o2: Pick<IMenuQuyen, 'id'> | null): boolean {
    return o1 && o2 ? this.getMenuQuyenIdentifier(o1) === this.getMenuQuyenIdentifier(o2) : o1 === o2;
  }

  addMenuQuyenToCollectionIfMissing<Type extends Pick<IMenuQuyen, 'id'>>(
    menuQuyenCollection: Type[],
    ...menuQuyensToCheck: (Type | null | undefined)[]
  ): Type[] {
    const menuQuyens: Type[] = menuQuyensToCheck.filter(isPresent);
    if (menuQuyens.length > 0) {
      const menuQuyenCollectionIdentifiers = menuQuyenCollection.map(menuQuyenItem => this.getMenuQuyenIdentifier(menuQuyenItem));
      const menuQuyensToAdd = menuQuyens.filter(menuQuyenItem => {
        const menuQuyenIdentifier = this.getMenuQuyenIdentifier(menuQuyenItem);
        if (menuQuyenCollectionIdentifiers.includes(menuQuyenIdentifier)) {
          return false;
        }
        menuQuyenCollectionIdentifiers.push(menuQuyenIdentifier);
        return true;
      });
      return [...menuQuyensToAdd, ...menuQuyenCollection];
    }
    return menuQuyenCollection;
  }
}
