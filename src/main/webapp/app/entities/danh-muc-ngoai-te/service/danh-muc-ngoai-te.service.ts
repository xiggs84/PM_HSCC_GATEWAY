import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucNgoaiTe, NewDanhMucNgoaiTe } from '../danh-muc-ngoai-te.model';

export type PartialUpdateDanhMucNgoaiTe = Partial<IDanhMucNgoaiTe> & Pick<IDanhMucNgoaiTe, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucNgoaiTe>;
export type EntityArrayResponseType = HttpResponse<IDanhMucNgoaiTe[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucNgoaiTeService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-ngoai-tes');

  create(danhMucNgoaiTe: NewDanhMucNgoaiTe): Observable<EntityResponseType> {
    return this.http.post<IDanhMucNgoaiTe>(this.resourceUrl, danhMucNgoaiTe, { observe: 'response' });
  }

  update(danhMucNgoaiTe: IDanhMucNgoaiTe): Observable<EntityResponseType> {
    return this.http.put<IDanhMucNgoaiTe>(`${this.resourceUrl}/${this.getDanhMucNgoaiTeIdentifier(danhMucNgoaiTe)}`, danhMucNgoaiTe, {
      observe: 'response',
    });
  }

  partialUpdate(danhMucNgoaiTe: PartialUpdateDanhMucNgoaiTe): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucNgoaiTe>(`${this.resourceUrl}/${this.getDanhMucNgoaiTeIdentifier(danhMucNgoaiTe)}`, danhMucNgoaiTe, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucNgoaiTe>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucNgoaiTe[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucNgoaiTeIdentifier(danhMucNgoaiTe: Pick<IDanhMucNgoaiTe, 'id'>): number {
    return danhMucNgoaiTe.id;
  }

  compareDanhMucNgoaiTe(o1: Pick<IDanhMucNgoaiTe, 'id'> | null, o2: Pick<IDanhMucNgoaiTe, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucNgoaiTeIdentifier(o1) === this.getDanhMucNgoaiTeIdentifier(o2) : o1 === o2;
  }

  addDanhMucNgoaiTeToCollectionIfMissing<Type extends Pick<IDanhMucNgoaiTe, 'id'>>(
    danhMucNgoaiTeCollection: Type[],
    ...danhMucNgoaiTesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucNgoaiTes: Type[] = danhMucNgoaiTesToCheck.filter(isPresent);
    if (danhMucNgoaiTes.length > 0) {
      const danhMucNgoaiTeCollectionIdentifiers = danhMucNgoaiTeCollection.map(danhMucNgoaiTeItem =>
        this.getDanhMucNgoaiTeIdentifier(danhMucNgoaiTeItem),
      );
      const danhMucNgoaiTesToAdd = danhMucNgoaiTes.filter(danhMucNgoaiTeItem => {
        const danhMucNgoaiTeIdentifier = this.getDanhMucNgoaiTeIdentifier(danhMucNgoaiTeItem);
        if (danhMucNgoaiTeCollectionIdentifiers.includes(danhMucNgoaiTeIdentifier)) {
          return false;
        }
        danhMucNgoaiTeCollectionIdentifiers.push(danhMucNgoaiTeIdentifier);
        return true;
      });
      return [...danhMucNgoaiTesToAdd, ...danhMucNgoaiTeCollection];
    }
    return danhMucNgoaiTeCollection;
  }
}
