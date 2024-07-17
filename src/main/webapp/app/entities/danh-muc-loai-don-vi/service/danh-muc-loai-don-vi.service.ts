import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucLoaiDonVi, NewDanhMucLoaiDonVi } from '../danh-muc-loai-don-vi.model';

export type PartialUpdateDanhMucLoaiDonVi = Partial<IDanhMucLoaiDonVi> & Pick<IDanhMucLoaiDonVi, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucLoaiDonVi>;
export type EntityArrayResponseType = HttpResponse<IDanhMucLoaiDonVi[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiDonViService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-loai-don-vis');

  create(danhMucLoaiDonVi: NewDanhMucLoaiDonVi): Observable<EntityResponseType> {
    return this.http.post<IDanhMucLoaiDonVi>(this.resourceUrl, danhMucLoaiDonVi, { observe: 'response' });
  }

  update(danhMucLoaiDonVi: IDanhMucLoaiDonVi): Observable<EntityResponseType> {
    return this.http.put<IDanhMucLoaiDonVi>(
      `${this.resourceUrl}/${this.getDanhMucLoaiDonViIdentifier(danhMucLoaiDonVi)}`,
      danhMucLoaiDonVi,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucLoaiDonVi: PartialUpdateDanhMucLoaiDonVi): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucLoaiDonVi>(
      `${this.resourceUrl}/${this.getDanhMucLoaiDonViIdentifier(danhMucLoaiDonVi)}`,
      danhMucLoaiDonVi,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucLoaiDonVi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucLoaiDonVi[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucLoaiDonViIdentifier(danhMucLoaiDonVi: Pick<IDanhMucLoaiDonVi, 'id'>): number {
    return danhMucLoaiDonVi.id;
  }

  compareDanhMucLoaiDonVi(o1: Pick<IDanhMucLoaiDonVi, 'id'> | null, o2: Pick<IDanhMucLoaiDonVi, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucLoaiDonViIdentifier(o1) === this.getDanhMucLoaiDonViIdentifier(o2) : o1 === o2;
  }

  addDanhMucLoaiDonViToCollectionIfMissing<Type extends Pick<IDanhMucLoaiDonVi, 'id'>>(
    danhMucLoaiDonViCollection: Type[],
    ...danhMucLoaiDonVisToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucLoaiDonVis: Type[] = danhMucLoaiDonVisToCheck.filter(isPresent);
    if (danhMucLoaiDonVis.length > 0) {
      const danhMucLoaiDonViCollectionIdentifiers = danhMucLoaiDonViCollection.map(danhMucLoaiDonViItem =>
        this.getDanhMucLoaiDonViIdentifier(danhMucLoaiDonViItem),
      );
      const danhMucLoaiDonVisToAdd = danhMucLoaiDonVis.filter(danhMucLoaiDonViItem => {
        const danhMucLoaiDonViIdentifier = this.getDanhMucLoaiDonViIdentifier(danhMucLoaiDonViItem);
        if (danhMucLoaiDonViCollectionIdentifiers.includes(danhMucLoaiDonViIdentifier)) {
          return false;
        }
        danhMucLoaiDonViCollectionIdentifiers.push(danhMucLoaiDonViIdentifier);
        return true;
      });
      return [...danhMucLoaiDonVisToAdd, ...danhMucLoaiDonViCollection];
    }
    return danhMucLoaiDonViCollection;
  }
}
