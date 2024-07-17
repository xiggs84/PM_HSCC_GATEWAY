import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucLoaiGiayTo, NewDanhMucLoaiGiayTo } from '../danh-muc-loai-giay-to.model';

export type PartialUpdateDanhMucLoaiGiayTo = Partial<IDanhMucLoaiGiayTo> & Pick<IDanhMucLoaiGiayTo, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucLoaiGiayTo>;
export type EntityArrayResponseType = HttpResponse<IDanhMucLoaiGiayTo[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiGiayToService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-loai-giay-tos');

  create(danhMucLoaiGiayTo: NewDanhMucLoaiGiayTo): Observable<EntityResponseType> {
    return this.http.post<IDanhMucLoaiGiayTo>(this.resourceUrl, danhMucLoaiGiayTo, { observe: 'response' });
  }

  update(danhMucLoaiGiayTo: IDanhMucLoaiGiayTo): Observable<EntityResponseType> {
    return this.http.put<IDanhMucLoaiGiayTo>(
      `${this.resourceUrl}/${this.getDanhMucLoaiGiayToIdentifier(danhMucLoaiGiayTo)}`,
      danhMucLoaiGiayTo,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucLoaiGiayTo: PartialUpdateDanhMucLoaiGiayTo): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucLoaiGiayTo>(
      `${this.resourceUrl}/${this.getDanhMucLoaiGiayToIdentifier(danhMucLoaiGiayTo)}`,
      danhMucLoaiGiayTo,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucLoaiGiayTo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucLoaiGiayTo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucLoaiGiayToIdentifier(danhMucLoaiGiayTo: Pick<IDanhMucLoaiGiayTo, 'id'>): number {
    return danhMucLoaiGiayTo.id;
  }

  compareDanhMucLoaiGiayTo(o1: Pick<IDanhMucLoaiGiayTo, 'id'> | null, o2: Pick<IDanhMucLoaiGiayTo, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucLoaiGiayToIdentifier(o1) === this.getDanhMucLoaiGiayToIdentifier(o2) : o1 === o2;
  }

  addDanhMucLoaiGiayToToCollectionIfMissing<Type extends Pick<IDanhMucLoaiGiayTo, 'id'>>(
    danhMucLoaiGiayToCollection: Type[],
    ...danhMucLoaiGiayTosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucLoaiGiayTos: Type[] = danhMucLoaiGiayTosToCheck.filter(isPresent);
    if (danhMucLoaiGiayTos.length > 0) {
      const danhMucLoaiGiayToCollectionIdentifiers = danhMucLoaiGiayToCollection.map(danhMucLoaiGiayToItem =>
        this.getDanhMucLoaiGiayToIdentifier(danhMucLoaiGiayToItem),
      );
      const danhMucLoaiGiayTosToAdd = danhMucLoaiGiayTos.filter(danhMucLoaiGiayToItem => {
        const danhMucLoaiGiayToIdentifier = this.getDanhMucLoaiGiayToIdentifier(danhMucLoaiGiayToItem);
        if (danhMucLoaiGiayToCollectionIdentifiers.includes(danhMucLoaiGiayToIdentifier)) {
          return false;
        }
        danhMucLoaiGiayToCollectionIdentifiers.push(danhMucLoaiGiayToIdentifier);
        return true;
      });
      return [...danhMucLoaiGiayTosToAdd, ...danhMucLoaiGiayToCollection];
    }
    return danhMucLoaiGiayToCollection;
  }
}
