import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITinhTrangTaiSan, NewTinhTrangTaiSan } from '../tinh-trang-tai-san.model';

export type PartialUpdateTinhTrangTaiSan = Partial<ITinhTrangTaiSan> & Pick<ITinhTrangTaiSan, 'id'>;

export type EntityResponseType = HttpResponse<ITinhTrangTaiSan>;
export type EntityArrayResponseType = HttpResponse<ITinhTrangTaiSan[]>;

@Injectable({ providedIn: 'root' })
export class TinhTrangTaiSanService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tinh-trang-tai-sans');

  create(tinhTrangTaiSan: NewTinhTrangTaiSan): Observable<EntityResponseType> {
    return this.http.post<ITinhTrangTaiSan>(this.resourceUrl, tinhTrangTaiSan, { observe: 'response' });
  }

  update(tinhTrangTaiSan: ITinhTrangTaiSan): Observable<EntityResponseType> {
    return this.http.put<ITinhTrangTaiSan>(`${this.resourceUrl}/${this.getTinhTrangTaiSanIdentifier(tinhTrangTaiSan)}`, tinhTrangTaiSan, {
      observe: 'response',
    });
  }

  partialUpdate(tinhTrangTaiSan: PartialUpdateTinhTrangTaiSan): Observable<EntityResponseType> {
    return this.http.patch<ITinhTrangTaiSan>(`${this.resourceUrl}/${this.getTinhTrangTaiSanIdentifier(tinhTrangTaiSan)}`, tinhTrangTaiSan, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITinhTrangTaiSan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITinhTrangTaiSan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTinhTrangTaiSanIdentifier(tinhTrangTaiSan: Pick<ITinhTrangTaiSan, 'id'>): number {
    return tinhTrangTaiSan.id;
  }

  compareTinhTrangTaiSan(o1: Pick<ITinhTrangTaiSan, 'id'> | null, o2: Pick<ITinhTrangTaiSan, 'id'> | null): boolean {
    return o1 && o2 ? this.getTinhTrangTaiSanIdentifier(o1) === this.getTinhTrangTaiSanIdentifier(o2) : o1 === o2;
  }

  addTinhTrangTaiSanToCollectionIfMissing<Type extends Pick<ITinhTrangTaiSan, 'id'>>(
    tinhTrangTaiSanCollection: Type[],
    ...tinhTrangTaiSansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tinhTrangTaiSans: Type[] = tinhTrangTaiSansToCheck.filter(isPresent);
    if (tinhTrangTaiSans.length > 0) {
      const tinhTrangTaiSanCollectionIdentifiers = tinhTrangTaiSanCollection.map(tinhTrangTaiSanItem =>
        this.getTinhTrangTaiSanIdentifier(tinhTrangTaiSanItem),
      );
      const tinhTrangTaiSansToAdd = tinhTrangTaiSans.filter(tinhTrangTaiSanItem => {
        const tinhTrangTaiSanIdentifier = this.getTinhTrangTaiSanIdentifier(tinhTrangTaiSanItem);
        if (tinhTrangTaiSanCollectionIdentifiers.includes(tinhTrangTaiSanIdentifier)) {
          return false;
        }
        tinhTrangTaiSanCollectionIdentifiers.push(tinhTrangTaiSanIdentifier);
        return true;
      });
      return [...tinhTrangTaiSansToAdd, ...tinhTrangTaiSanCollection];
    }
    return tinhTrangTaiSanCollection;
  }
}
