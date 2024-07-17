import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucDauSoCmnd, NewDanhMucDauSoCmnd } from '../danh-muc-dau-so-cmnd.model';

export type PartialUpdateDanhMucDauSoCmnd = Partial<IDanhMucDauSoCmnd> & Pick<IDanhMucDauSoCmnd, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucDauSoCmnd>;
export type EntityArrayResponseType = HttpResponse<IDanhMucDauSoCmnd[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucDauSoCmndService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-dau-so-cmnds');

  create(danhMucDauSoCmnd: NewDanhMucDauSoCmnd): Observable<EntityResponseType> {
    return this.http.post<IDanhMucDauSoCmnd>(this.resourceUrl, danhMucDauSoCmnd, { observe: 'response' });
  }

  update(danhMucDauSoCmnd: IDanhMucDauSoCmnd): Observable<EntityResponseType> {
    return this.http.put<IDanhMucDauSoCmnd>(
      `${this.resourceUrl}/${this.getDanhMucDauSoCmndIdentifier(danhMucDauSoCmnd)}`,
      danhMucDauSoCmnd,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucDauSoCmnd: PartialUpdateDanhMucDauSoCmnd): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucDauSoCmnd>(
      `${this.resourceUrl}/${this.getDanhMucDauSoCmndIdentifier(danhMucDauSoCmnd)}`,
      danhMucDauSoCmnd,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucDauSoCmnd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucDauSoCmnd[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucDauSoCmndIdentifier(danhMucDauSoCmnd: Pick<IDanhMucDauSoCmnd, 'id'>): number {
    return danhMucDauSoCmnd.id;
  }

  compareDanhMucDauSoCmnd(o1: Pick<IDanhMucDauSoCmnd, 'id'> | null, o2: Pick<IDanhMucDauSoCmnd, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucDauSoCmndIdentifier(o1) === this.getDanhMucDauSoCmndIdentifier(o2) : o1 === o2;
  }

  addDanhMucDauSoCmndToCollectionIfMissing<Type extends Pick<IDanhMucDauSoCmnd, 'id'>>(
    danhMucDauSoCmndCollection: Type[],
    ...danhMucDauSoCmndsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucDauSoCmnds: Type[] = danhMucDauSoCmndsToCheck.filter(isPresent);
    if (danhMucDauSoCmnds.length > 0) {
      const danhMucDauSoCmndCollectionIdentifiers = danhMucDauSoCmndCollection.map(danhMucDauSoCmndItem =>
        this.getDanhMucDauSoCmndIdentifier(danhMucDauSoCmndItem),
      );
      const danhMucDauSoCmndsToAdd = danhMucDauSoCmnds.filter(danhMucDauSoCmndItem => {
        const danhMucDauSoCmndIdentifier = this.getDanhMucDauSoCmndIdentifier(danhMucDauSoCmndItem);
        if (danhMucDauSoCmndCollectionIdentifiers.includes(danhMucDauSoCmndIdentifier)) {
          return false;
        }
        danhMucDauSoCmndCollectionIdentifiers.push(danhMucDauSoCmndIdentifier);
        return true;
      });
      return [...danhMucDauSoCmndsToAdd, ...danhMucDauSoCmndCollection];
    }
    return danhMucDauSoCmndCollection;
  }
}
