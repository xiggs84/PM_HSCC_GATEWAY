import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITinhTrangDuongSu, NewTinhTrangDuongSu } from '../tinh-trang-duong-su.model';

export type PartialUpdateTinhTrangDuongSu = Partial<ITinhTrangDuongSu> & Pick<ITinhTrangDuongSu, 'id'>;

export type EntityResponseType = HttpResponse<ITinhTrangDuongSu>;
export type EntityArrayResponseType = HttpResponse<ITinhTrangDuongSu[]>;

@Injectable({ providedIn: 'root' })
export class TinhTrangDuongSuService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tinh-trang-duong-sus');

  create(tinhTrangDuongSu: NewTinhTrangDuongSu): Observable<EntityResponseType> {
    return this.http.post<ITinhTrangDuongSu>(this.resourceUrl, tinhTrangDuongSu, { observe: 'response' });
  }

  update(tinhTrangDuongSu: ITinhTrangDuongSu): Observable<EntityResponseType> {
    return this.http.put<ITinhTrangDuongSu>(
      `${this.resourceUrl}/${this.getTinhTrangDuongSuIdentifier(tinhTrangDuongSu)}`,
      tinhTrangDuongSu,
      { observe: 'response' },
    );
  }

  partialUpdate(tinhTrangDuongSu: PartialUpdateTinhTrangDuongSu): Observable<EntityResponseType> {
    return this.http.patch<ITinhTrangDuongSu>(
      `${this.resourceUrl}/${this.getTinhTrangDuongSuIdentifier(tinhTrangDuongSu)}`,
      tinhTrangDuongSu,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITinhTrangDuongSu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITinhTrangDuongSu[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTinhTrangDuongSuIdentifier(tinhTrangDuongSu: Pick<ITinhTrangDuongSu, 'id'>): number {
    return tinhTrangDuongSu.id;
  }

  compareTinhTrangDuongSu(o1: Pick<ITinhTrangDuongSu, 'id'> | null, o2: Pick<ITinhTrangDuongSu, 'id'> | null): boolean {
    return o1 && o2 ? this.getTinhTrangDuongSuIdentifier(o1) === this.getTinhTrangDuongSuIdentifier(o2) : o1 === o2;
  }

  addTinhTrangDuongSuToCollectionIfMissing<Type extends Pick<ITinhTrangDuongSu, 'id'>>(
    tinhTrangDuongSuCollection: Type[],
    ...tinhTrangDuongSusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tinhTrangDuongSus: Type[] = tinhTrangDuongSusToCheck.filter(isPresent);
    if (tinhTrangDuongSus.length > 0) {
      const tinhTrangDuongSuCollectionIdentifiers = tinhTrangDuongSuCollection.map(tinhTrangDuongSuItem =>
        this.getTinhTrangDuongSuIdentifier(tinhTrangDuongSuItem),
      );
      const tinhTrangDuongSusToAdd = tinhTrangDuongSus.filter(tinhTrangDuongSuItem => {
        const tinhTrangDuongSuIdentifier = this.getTinhTrangDuongSuIdentifier(tinhTrangDuongSuItem);
        if (tinhTrangDuongSuCollectionIdentifiers.includes(tinhTrangDuongSuIdentifier)) {
          return false;
        }
        tinhTrangDuongSuCollectionIdentifiers.push(tinhTrangDuongSuIdentifier);
        return true;
      });
      return [...tinhTrangDuongSusToAdd, ...tinhTrangDuongSuCollection];
    }
    return tinhTrangDuongSuCollection;
  }
}
