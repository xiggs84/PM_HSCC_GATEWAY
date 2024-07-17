import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucDichVu, NewDanhMucDichVu } from '../danh-muc-dich-vu.model';

export type PartialUpdateDanhMucDichVu = Partial<IDanhMucDichVu> & Pick<IDanhMucDichVu, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucDichVu>;
export type EntityArrayResponseType = HttpResponse<IDanhMucDichVu[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucDichVuService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-dich-vus');

  create(danhMucDichVu: NewDanhMucDichVu): Observable<EntityResponseType> {
    return this.http.post<IDanhMucDichVu>(this.resourceUrl, danhMucDichVu, { observe: 'response' });
  }

  update(danhMucDichVu: IDanhMucDichVu): Observable<EntityResponseType> {
    return this.http.put<IDanhMucDichVu>(`${this.resourceUrl}/${this.getDanhMucDichVuIdentifier(danhMucDichVu)}`, danhMucDichVu, {
      observe: 'response',
    });
  }

  partialUpdate(danhMucDichVu: PartialUpdateDanhMucDichVu): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucDichVu>(`${this.resourceUrl}/${this.getDanhMucDichVuIdentifier(danhMucDichVu)}`, danhMucDichVu, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucDichVu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucDichVu[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucDichVuIdentifier(danhMucDichVu: Pick<IDanhMucDichVu, 'id'>): number {
    return danhMucDichVu.id;
  }

  compareDanhMucDichVu(o1: Pick<IDanhMucDichVu, 'id'> | null, o2: Pick<IDanhMucDichVu, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucDichVuIdentifier(o1) === this.getDanhMucDichVuIdentifier(o2) : o1 === o2;
  }

  addDanhMucDichVuToCollectionIfMissing<Type extends Pick<IDanhMucDichVu, 'id'>>(
    danhMucDichVuCollection: Type[],
    ...danhMucDichVusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucDichVus: Type[] = danhMucDichVusToCheck.filter(isPresent);
    if (danhMucDichVus.length > 0) {
      const danhMucDichVuCollectionIdentifiers = danhMucDichVuCollection.map(danhMucDichVuItem =>
        this.getDanhMucDichVuIdentifier(danhMucDichVuItem),
      );
      const danhMucDichVusToAdd = danhMucDichVus.filter(danhMucDichVuItem => {
        const danhMucDichVuIdentifier = this.getDanhMucDichVuIdentifier(danhMucDichVuItem);
        if (danhMucDichVuCollectionIdentifiers.includes(danhMucDichVuIdentifier)) {
          return false;
        }
        danhMucDichVuCollectionIdentifiers.push(danhMucDichVuIdentifier);
        return true;
      });
      return [...danhMucDichVusToAdd, ...danhMucDichVuCollection];
    }
    return danhMucDichVuCollection;
  }
}
