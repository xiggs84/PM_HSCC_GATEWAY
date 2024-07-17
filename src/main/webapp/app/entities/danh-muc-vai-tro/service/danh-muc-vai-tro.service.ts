import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucVaiTro, NewDanhMucVaiTro } from '../danh-muc-vai-tro.model';

export type PartialUpdateDanhMucVaiTro = Partial<IDanhMucVaiTro> & Pick<IDanhMucVaiTro, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucVaiTro>;
export type EntityArrayResponseType = HttpResponse<IDanhMucVaiTro[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucVaiTroService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-vai-tros');

  create(danhMucVaiTro: NewDanhMucVaiTro): Observable<EntityResponseType> {
    return this.http.post<IDanhMucVaiTro>(this.resourceUrl, danhMucVaiTro, { observe: 'response' });
  }

  update(danhMucVaiTro: IDanhMucVaiTro): Observable<EntityResponseType> {
    return this.http.put<IDanhMucVaiTro>(`${this.resourceUrl}/${this.getDanhMucVaiTroIdentifier(danhMucVaiTro)}`, danhMucVaiTro, {
      observe: 'response',
    });
  }

  partialUpdate(danhMucVaiTro: PartialUpdateDanhMucVaiTro): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucVaiTro>(`${this.resourceUrl}/${this.getDanhMucVaiTroIdentifier(danhMucVaiTro)}`, danhMucVaiTro, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucVaiTro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucVaiTro[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucVaiTroIdentifier(danhMucVaiTro: Pick<IDanhMucVaiTro, 'id'>): number {
    return danhMucVaiTro.id;
  }

  compareDanhMucVaiTro(o1: Pick<IDanhMucVaiTro, 'id'> | null, o2: Pick<IDanhMucVaiTro, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucVaiTroIdentifier(o1) === this.getDanhMucVaiTroIdentifier(o2) : o1 === o2;
  }

  addDanhMucVaiTroToCollectionIfMissing<Type extends Pick<IDanhMucVaiTro, 'id'>>(
    danhMucVaiTroCollection: Type[],
    ...danhMucVaiTrosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucVaiTros: Type[] = danhMucVaiTrosToCheck.filter(isPresent);
    if (danhMucVaiTros.length > 0) {
      const danhMucVaiTroCollectionIdentifiers = danhMucVaiTroCollection.map(danhMucVaiTroItem =>
        this.getDanhMucVaiTroIdentifier(danhMucVaiTroItem),
      );
      const danhMucVaiTrosToAdd = danhMucVaiTros.filter(danhMucVaiTroItem => {
        const danhMucVaiTroIdentifier = this.getDanhMucVaiTroIdentifier(danhMucVaiTroItem);
        if (danhMucVaiTroCollectionIdentifiers.includes(danhMucVaiTroIdentifier)) {
          return false;
        }
        danhMucVaiTroCollectionIdentifiers.push(danhMucVaiTroIdentifier);
        return true;
      });
      return [...danhMucVaiTrosToAdd, ...danhMucVaiTroCollection];
    }
    return danhMucVaiTroCollection;
  }
}
