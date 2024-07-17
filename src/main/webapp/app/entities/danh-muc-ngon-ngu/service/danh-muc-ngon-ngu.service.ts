import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucNgonNgu, NewDanhMucNgonNgu } from '../danh-muc-ngon-ngu.model';

export type PartialUpdateDanhMucNgonNgu = Partial<IDanhMucNgonNgu> & Pick<IDanhMucNgonNgu, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucNgonNgu>;
export type EntityArrayResponseType = HttpResponse<IDanhMucNgonNgu[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucNgonNguService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-ngon-ngus');

  create(danhMucNgonNgu: NewDanhMucNgonNgu): Observable<EntityResponseType> {
    return this.http.post<IDanhMucNgonNgu>(this.resourceUrl, danhMucNgonNgu, { observe: 'response' });
  }

  update(danhMucNgonNgu: IDanhMucNgonNgu): Observable<EntityResponseType> {
    return this.http.put<IDanhMucNgonNgu>(`${this.resourceUrl}/${this.getDanhMucNgonNguIdentifier(danhMucNgonNgu)}`, danhMucNgonNgu, {
      observe: 'response',
    });
  }

  partialUpdate(danhMucNgonNgu: PartialUpdateDanhMucNgonNgu): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucNgonNgu>(`${this.resourceUrl}/${this.getDanhMucNgonNguIdentifier(danhMucNgonNgu)}`, danhMucNgonNgu, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucNgonNgu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucNgonNgu[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucNgonNguIdentifier(danhMucNgonNgu: Pick<IDanhMucNgonNgu, 'id'>): number {
    return danhMucNgonNgu.id;
  }

  compareDanhMucNgonNgu(o1: Pick<IDanhMucNgonNgu, 'id'> | null, o2: Pick<IDanhMucNgonNgu, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucNgonNguIdentifier(o1) === this.getDanhMucNgonNguIdentifier(o2) : o1 === o2;
  }

  addDanhMucNgonNguToCollectionIfMissing<Type extends Pick<IDanhMucNgonNgu, 'id'>>(
    danhMucNgonNguCollection: Type[],
    ...danhMucNgonNgusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucNgonNgus: Type[] = danhMucNgonNgusToCheck.filter(isPresent);
    if (danhMucNgonNgus.length > 0) {
      const danhMucNgonNguCollectionIdentifiers = danhMucNgonNguCollection.map(danhMucNgonNguItem =>
        this.getDanhMucNgonNguIdentifier(danhMucNgonNguItem),
      );
      const danhMucNgonNgusToAdd = danhMucNgonNgus.filter(danhMucNgonNguItem => {
        const danhMucNgonNguIdentifier = this.getDanhMucNgonNguIdentifier(danhMucNgonNguItem);
        if (danhMucNgonNguCollectionIdentifiers.includes(danhMucNgonNguIdentifier)) {
          return false;
        }
        danhMucNgonNguCollectionIdentifiers.push(danhMucNgonNguIdentifier);
        return true;
      });
      return [...danhMucNgonNgusToAdd, ...danhMucNgonNguCollection];
    }
    return danhMucNgonNguCollection;
  }
}
