import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucNoiCapQsh, NewDanhMucNoiCapQsh } from '../danh-muc-noi-cap-qsh.model';

export type PartialUpdateDanhMucNoiCapQsh = Partial<IDanhMucNoiCapQsh> & Pick<IDanhMucNoiCapQsh, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucNoiCapQsh>;
export type EntityArrayResponseType = HttpResponse<IDanhMucNoiCapQsh[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucNoiCapQshService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-noi-cap-qshes');

  create(danhMucNoiCapQsh: NewDanhMucNoiCapQsh): Observable<EntityResponseType> {
    return this.http.post<IDanhMucNoiCapQsh>(this.resourceUrl, danhMucNoiCapQsh, { observe: 'response' });
  }

  update(danhMucNoiCapQsh: IDanhMucNoiCapQsh): Observable<EntityResponseType> {
    return this.http.put<IDanhMucNoiCapQsh>(
      `${this.resourceUrl}/${this.getDanhMucNoiCapQshIdentifier(danhMucNoiCapQsh)}`,
      danhMucNoiCapQsh,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucNoiCapQsh: PartialUpdateDanhMucNoiCapQsh): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucNoiCapQsh>(
      `${this.resourceUrl}/${this.getDanhMucNoiCapQshIdentifier(danhMucNoiCapQsh)}`,
      danhMucNoiCapQsh,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucNoiCapQsh>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucNoiCapQsh[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucNoiCapQshIdentifier(danhMucNoiCapQsh: Pick<IDanhMucNoiCapQsh, 'id'>): number {
    return danhMucNoiCapQsh.id;
  }

  compareDanhMucNoiCapQsh(o1: Pick<IDanhMucNoiCapQsh, 'id'> | null, o2: Pick<IDanhMucNoiCapQsh, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucNoiCapQshIdentifier(o1) === this.getDanhMucNoiCapQshIdentifier(o2) : o1 === o2;
  }

  addDanhMucNoiCapQshToCollectionIfMissing<Type extends Pick<IDanhMucNoiCapQsh, 'id'>>(
    danhMucNoiCapQshCollection: Type[],
    ...danhMucNoiCapQshesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucNoiCapQshes: Type[] = danhMucNoiCapQshesToCheck.filter(isPresent);
    if (danhMucNoiCapQshes.length > 0) {
      const danhMucNoiCapQshCollectionIdentifiers = danhMucNoiCapQshCollection.map(danhMucNoiCapQshItem =>
        this.getDanhMucNoiCapQshIdentifier(danhMucNoiCapQshItem),
      );
      const danhMucNoiCapQshesToAdd = danhMucNoiCapQshes.filter(danhMucNoiCapQshItem => {
        const danhMucNoiCapQshIdentifier = this.getDanhMucNoiCapQshIdentifier(danhMucNoiCapQshItem);
        if (danhMucNoiCapQshCollectionIdentifiers.includes(danhMucNoiCapQshIdentifier)) {
          return false;
        }
        danhMucNoiCapQshCollectionIdentifiers.push(danhMucNoiCapQshIdentifier);
        return true;
      });
      return [...danhMucNoiCapQshesToAdd, ...danhMucNoiCapQshCollection];
    }
    return danhMucNoiCapQshCollection;
  }
}
