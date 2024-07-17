import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICauHinhThongTinDuongSu, NewCauHinhThongTinDuongSu } from '../cau-hinh-thong-tin-duong-su.model';

export type PartialUpdateCauHinhThongTinDuongSu = Partial<ICauHinhThongTinDuongSu> & Pick<ICauHinhThongTinDuongSu, 'id'>;

export type EntityResponseType = HttpResponse<ICauHinhThongTinDuongSu>;
export type EntityArrayResponseType = HttpResponse<ICauHinhThongTinDuongSu[]>;

@Injectable({ providedIn: 'root' })
export class CauHinhThongTinDuongSuService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cau-hinh-thong-tin-duong-sus');

  create(cauHinhThongTinDuongSu: NewCauHinhThongTinDuongSu): Observable<EntityResponseType> {
    return this.http.post<ICauHinhThongTinDuongSu>(this.resourceUrl, cauHinhThongTinDuongSu, { observe: 'response' });
  }

  update(cauHinhThongTinDuongSu: ICauHinhThongTinDuongSu): Observable<EntityResponseType> {
    return this.http.put<ICauHinhThongTinDuongSu>(
      `${this.resourceUrl}/${this.getCauHinhThongTinDuongSuIdentifier(cauHinhThongTinDuongSu)}`,
      cauHinhThongTinDuongSu,
      { observe: 'response' },
    );
  }

  partialUpdate(cauHinhThongTinDuongSu: PartialUpdateCauHinhThongTinDuongSu): Observable<EntityResponseType> {
    return this.http.patch<ICauHinhThongTinDuongSu>(
      `${this.resourceUrl}/${this.getCauHinhThongTinDuongSuIdentifier(cauHinhThongTinDuongSu)}`,
      cauHinhThongTinDuongSu,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICauHinhThongTinDuongSu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICauHinhThongTinDuongSu[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCauHinhThongTinDuongSuIdentifier(cauHinhThongTinDuongSu: Pick<ICauHinhThongTinDuongSu, 'id'>): number {
    return cauHinhThongTinDuongSu.id;
  }

  compareCauHinhThongTinDuongSu(o1: Pick<ICauHinhThongTinDuongSu, 'id'> | null, o2: Pick<ICauHinhThongTinDuongSu, 'id'> | null): boolean {
    return o1 && o2 ? this.getCauHinhThongTinDuongSuIdentifier(o1) === this.getCauHinhThongTinDuongSuIdentifier(o2) : o1 === o2;
  }

  addCauHinhThongTinDuongSuToCollectionIfMissing<Type extends Pick<ICauHinhThongTinDuongSu, 'id'>>(
    cauHinhThongTinDuongSuCollection: Type[],
    ...cauHinhThongTinDuongSusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cauHinhThongTinDuongSus: Type[] = cauHinhThongTinDuongSusToCheck.filter(isPresent);
    if (cauHinhThongTinDuongSus.length > 0) {
      const cauHinhThongTinDuongSuCollectionIdentifiers = cauHinhThongTinDuongSuCollection.map(cauHinhThongTinDuongSuItem =>
        this.getCauHinhThongTinDuongSuIdentifier(cauHinhThongTinDuongSuItem),
      );
      const cauHinhThongTinDuongSusToAdd = cauHinhThongTinDuongSus.filter(cauHinhThongTinDuongSuItem => {
        const cauHinhThongTinDuongSuIdentifier = this.getCauHinhThongTinDuongSuIdentifier(cauHinhThongTinDuongSuItem);
        if (cauHinhThongTinDuongSuCollectionIdentifiers.includes(cauHinhThongTinDuongSuIdentifier)) {
          return false;
        }
        cauHinhThongTinDuongSuCollectionIdentifiers.push(cauHinhThongTinDuongSuIdentifier);
        return true;
      });
      return [...cauHinhThongTinDuongSusToAdd, ...cauHinhThongTinDuongSuCollection];
    }
    return cauHinhThongTinDuongSuCollection;
  }
}
