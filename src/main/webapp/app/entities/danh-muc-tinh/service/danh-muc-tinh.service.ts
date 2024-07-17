import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucTinh, NewDanhMucTinh } from '../danh-muc-tinh.model';

export type PartialUpdateDanhMucTinh = Partial<IDanhMucTinh> & Pick<IDanhMucTinh, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucTinh>;
export type EntityArrayResponseType = HttpResponse<IDanhMucTinh[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucTinhService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-tinhs');

  create(danhMucTinh: NewDanhMucTinh): Observable<EntityResponseType> {
    return this.http.post<IDanhMucTinh>(this.resourceUrl, danhMucTinh, { observe: 'response' });
  }

  update(danhMucTinh: IDanhMucTinh): Observable<EntityResponseType> {
    return this.http.put<IDanhMucTinh>(`${this.resourceUrl}/${this.getDanhMucTinhIdentifier(danhMucTinh)}`, danhMucTinh, {
      observe: 'response',
    });
  }

  partialUpdate(danhMucTinh: PartialUpdateDanhMucTinh): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucTinh>(`${this.resourceUrl}/${this.getDanhMucTinhIdentifier(danhMucTinh)}`, danhMucTinh, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucTinh>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucTinh[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucTinhIdentifier(danhMucTinh: Pick<IDanhMucTinh, 'id'>): number {
    return danhMucTinh.id;
  }

  compareDanhMucTinh(o1: Pick<IDanhMucTinh, 'id'> | null, o2: Pick<IDanhMucTinh, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucTinhIdentifier(o1) === this.getDanhMucTinhIdentifier(o2) : o1 === o2;
  }

  addDanhMucTinhToCollectionIfMissing<Type extends Pick<IDanhMucTinh, 'id'>>(
    danhMucTinhCollection: Type[],
    ...danhMucTinhsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucTinhs: Type[] = danhMucTinhsToCheck.filter(isPresent);
    if (danhMucTinhs.length > 0) {
      const danhMucTinhCollectionIdentifiers = danhMucTinhCollection.map(danhMucTinhItem => this.getDanhMucTinhIdentifier(danhMucTinhItem));
      const danhMucTinhsToAdd = danhMucTinhs.filter(danhMucTinhItem => {
        const danhMucTinhIdentifier = this.getDanhMucTinhIdentifier(danhMucTinhItem);
        if (danhMucTinhCollectionIdentifiers.includes(danhMucTinhIdentifier)) {
          return false;
        }
        danhMucTinhCollectionIdentifiers.push(danhMucTinhIdentifier);
        return true;
      });
      return [...danhMucTinhsToAdd, ...danhMucTinhCollection];
    }
    return danhMucTinhCollection;
  }
}
