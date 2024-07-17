import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICauHinhThongTinLoaiTaiSan, NewCauHinhThongTinLoaiTaiSan } from '../cau-hinh-thong-tin-loai-tai-san.model';

export type PartialUpdateCauHinhThongTinLoaiTaiSan = Partial<ICauHinhThongTinLoaiTaiSan> & Pick<ICauHinhThongTinLoaiTaiSan, 'id'>;

export type EntityResponseType = HttpResponse<ICauHinhThongTinLoaiTaiSan>;
export type EntityArrayResponseType = HttpResponse<ICauHinhThongTinLoaiTaiSan[]>;

@Injectable({ providedIn: 'root' })
export class CauHinhThongTinLoaiTaiSanService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cau-hinh-thong-tin-loai-tai-sans');

  create(cauHinhThongTinLoaiTaiSan: NewCauHinhThongTinLoaiTaiSan): Observable<EntityResponseType> {
    return this.http.post<ICauHinhThongTinLoaiTaiSan>(this.resourceUrl, cauHinhThongTinLoaiTaiSan, { observe: 'response' });
  }

  update(cauHinhThongTinLoaiTaiSan: ICauHinhThongTinLoaiTaiSan): Observable<EntityResponseType> {
    return this.http.put<ICauHinhThongTinLoaiTaiSan>(
      `${this.resourceUrl}/${this.getCauHinhThongTinLoaiTaiSanIdentifier(cauHinhThongTinLoaiTaiSan)}`,
      cauHinhThongTinLoaiTaiSan,
      { observe: 'response' },
    );
  }

  partialUpdate(cauHinhThongTinLoaiTaiSan: PartialUpdateCauHinhThongTinLoaiTaiSan): Observable<EntityResponseType> {
    return this.http.patch<ICauHinhThongTinLoaiTaiSan>(
      `${this.resourceUrl}/${this.getCauHinhThongTinLoaiTaiSanIdentifier(cauHinhThongTinLoaiTaiSan)}`,
      cauHinhThongTinLoaiTaiSan,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICauHinhThongTinLoaiTaiSan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICauHinhThongTinLoaiTaiSan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCauHinhThongTinLoaiTaiSanIdentifier(cauHinhThongTinLoaiTaiSan: Pick<ICauHinhThongTinLoaiTaiSan, 'id'>): number {
    return cauHinhThongTinLoaiTaiSan.id;
  }

  compareCauHinhThongTinLoaiTaiSan(
    o1: Pick<ICauHinhThongTinLoaiTaiSan, 'id'> | null,
    o2: Pick<ICauHinhThongTinLoaiTaiSan, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getCauHinhThongTinLoaiTaiSanIdentifier(o1) === this.getCauHinhThongTinLoaiTaiSanIdentifier(o2) : o1 === o2;
  }

  addCauHinhThongTinLoaiTaiSanToCollectionIfMissing<Type extends Pick<ICauHinhThongTinLoaiTaiSan, 'id'>>(
    cauHinhThongTinLoaiTaiSanCollection: Type[],
    ...cauHinhThongTinLoaiTaiSansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cauHinhThongTinLoaiTaiSans: Type[] = cauHinhThongTinLoaiTaiSansToCheck.filter(isPresent);
    if (cauHinhThongTinLoaiTaiSans.length > 0) {
      const cauHinhThongTinLoaiTaiSanCollectionIdentifiers = cauHinhThongTinLoaiTaiSanCollection.map(cauHinhThongTinLoaiTaiSanItem =>
        this.getCauHinhThongTinLoaiTaiSanIdentifier(cauHinhThongTinLoaiTaiSanItem),
      );
      const cauHinhThongTinLoaiTaiSansToAdd = cauHinhThongTinLoaiTaiSans.filter(cauHinhThongTinLoaiTaiSanItem => {
        const cauHinhThongTinLoaiTaiSanIdentifier = this.getCauHinhThongTinLoaiTaiSanIdentifier(cauHinhThongTinLoaiTaiSanItem);
        if (cauHinhThongTinLoaiTaiSanCollectionIdentifiers.includes(cauHinhThongTinLoaiTaiSanIdentifier)) {
          return false;
        }
        cauHinhThongTinLoaiTaiSanCollectionIdentifiers.push(cauHinhThongTinLoaiTaiSanIdentifier);
        return true;
      });
      return [...cauHinhThongTinLoaiTaiSansToAdd, ...cauHinhThongTinLoaiTaiSanCollection];
    }
    return cauHinhThongTinLoaiTaiSanCollection;
  }
}
