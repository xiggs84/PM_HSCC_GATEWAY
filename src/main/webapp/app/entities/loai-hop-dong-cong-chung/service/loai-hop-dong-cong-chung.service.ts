import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILoaiHopDongCongChung, NewLoaiHopDongCongChung } from '../loai-hop-dong-cong-chung.model';

export type PartialUpdateLoaiHopDongCongChung = Partial<ILoaiHopDongCongChung> & Pick<ILoaiHopDongCongChung, 'id'>;

export type EntityResponseType = HttpResponse<ILoaiHopDongCongChung>;
export type EntityArrayResponseType = HttpResponse<ILoaiHopDongCongChung[]>;

@Injectable({ providedIn: 'root' })
export class LoaiHopDongCongChungService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/loai-hop-dong-cong-chungs');

  create(loaiHopDongCongChung: NewLoaiHopDongCongChung): Observable<EntityResponseType> {
    return this.http.post<ILoaiHopDongCongChung>(this.resourceUrl, loaiHopDongCongChung, { observe: 'response' });
  }

  update(loaiHopDongCongChung: ILoaiHopDongCongChung): Observable<EntityResponseType> {
    return this.http.put<ILoaiHopDongCongChung>(
      `${this.resourceUrl}/${this.getLoaiHopDongCongChungIdentifier(loaiHopDongCongChung)}`,
      loaiHopDongCongChung,
      { observe: 'response' },
    );
  }

  partialUpdate(loaiHopDongCongChung: PartialUpdateLoaiHopDongCongChung): Observable<EntityResponseType> {
    return this.http.patch<ILoaiHopDongCongChung>(
      `${this.resourceUrl}/${this.getLoaiHopDongCongChungIdentifier(loaiHopDongCongChung)}`,
      loaiHopDongCongChung,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILoaiHopDongCongChung>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoaiHopDongCongChung[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLoaiHopDongCongChungIdentifier(loaiHopDongCongChung: Pick<ILoaiHopDongCongChung, 'id'>): number {
    return loaiHopDongCongChung.id;
  }

  compareLoaiHopDongCongChung(o1: Pick<ILoaiHopDongCongChung, 'id'> | null, o2: Pick<ILoaiHopDongCongChung, 'id'> | null): boolean {
    return o1 && o2 ? this.getLoaiHopDongCongChungIdentifier(o1) === this.getLoaiHopDongCongChungIdentifier(o2) : o1 === o2;
  }

  addLoaiHopDongCongChungToCollectionIfMissing<Type extends Pick<ILoaiHopDongCongChung, 'id'>>(
    loaiHopDongCongChungCollection: Type[],
    ...loaiHopDongCongChungsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const loaiHopDongCongChungs: Type[] = loaiHopDongCongChungsToCheck.filter(isPresent);
    if (loaiHopDongCongChungs.length > 0) {
      const loaiHopDongCongChungCollectionIdentifiers = loaiHopDongCongChungCollection.map(loaiHopDongCongChungItem =>
        this.getLoaiHopDongCongChungIdentifier(loaiHopDongCongChungItem),
      );
      const loaiHopDongCongChungsToAdd = loaiHopDongCongChungs.filter(loaiHopDongCongChungItem => {
        const loaiHopDongCongChungIdentifier = this.getLoaiHopDongCongChungIdentifier(loaiHopDongCongChungItem);
        if (loaiHopDongCongChungCollectionIdentifiers.includes(loaiHopDongCongChungIdentifier)) {
          return false;
        }
        loaiHopDongCongChungCollectionIdentifiers.push(loaiHopDongCongChungIdentifier);
        return true;
      });
      return [...loaiHopDongCongChungsToAdd, ...loaiHopDongCongChungCollection];
    }
    return loaiHopDongCongChungCollection;
  }
}
