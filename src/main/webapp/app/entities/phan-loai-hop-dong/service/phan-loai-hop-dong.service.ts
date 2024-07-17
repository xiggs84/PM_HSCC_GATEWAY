import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPhanLoaiHopDong, NewPhanLoaiHopDong } from '../phan-loai-hop-dong.model';

export type PartialUpdatePhanLoaiHopDong = Partial<IPhanLoaiHopDong> & Pick<IPhanLoaiHopDong, 'id'>;

export type EntityResponseType = HttpResponse<IPhanLoaiHopDong>;
export type EntityArrayResponseType = HttpResponse<IPhanLoaiHopDong[]>;

@Injectable({ providedIn: 'root' })
export class PhanLoaiHopDongService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/phan-loai-hop-dongs');

  create(phanLoaiHopDong: NewPhanLoaiHopDong): Observable<EntityResponseType> {
    return this.http.post<IPhanLoaiHopDong>(this.resourceUrl, phanLoaiHopDong, { observe: 'response' });
  }

  update(phanLoaiHopDong: IPhanLoaiHopDong): Observable<EntityResponseType> {
    return this.http.put<IPhanLoaiHopDong>(`${this.resourceUrl}/${this.getPhanLoaiHopDongIdentifier(phanLoaiHopDong)}`, phanLoaiHopDong, {
      observe: 'response',
    });
  }

  partialUpdate(phanLoaiHopDong: PartialUpdatePhanLoaiHopDong): Observable<EntityResponseType> {
    return this.http.patch<IPhanLoaiHopDong>(`${this.resourceUrl}/${this.getPhanLoaiHopDongIdentifier(phanLoaiHopDong)}`, phanLoaiHopDong, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPhanLoaiHopDong>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPhanLoaiHopDong[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPhanLoaiHopDongIdentifier(phanLoaiHopDong: Pick<IPhanLoaiHopDong, 'id'>): number {
    return phanLoaiHopDong.id;
  }

  comparePhanLoaiHopDong(o1: Pick<IPhanLoaiHopDong, 'id'> | null, o2: Pick<IPhanLoaiHopDong, 'id'> | null): boolean {
    return o1 && o2 ? this.getPhanLoaiHopDongIdentifier(o1) === this.getPhanLoaiHopDongIdentifier(o2) : o1 === o2;
  }

  addPhanLoaiHopDongToCollectionIfMissing<Type extends Pick<IPhanLoaiHopDong, 'id'>>(
    phanLoaiHopDongCollection: Type[],
    ...phanLoaiHopDongsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const phanLoaiHopDongs: Type[] = phanLoaiHopDongsToCheck.filter(isPresent);
    if (phanLoaiHopDongs.length > 0) {
      const phanLoaiHopDongCollectionIdentifiers = phanLoaiHopDongCollection.map(phanLoaiHopDongItem =>
        this.getPhanLoaiHopDongIdentifier(phanLoaiHopDongItem),
      );
      const phanLoaiHopDongsToAdd = phanLoaiHopDongs.filter(phanLoaiHopDongItem => {
        const phanLoaiHopDongIdentifier = this.getPhanLoaiHopDongIdentifier(phanLoaiHopDongItem);
        if (phanLoaiHopDongCollectionIdentifiers.includes(phanLoaiHopDongIdentifier)) {
          return false;
        }
        phanLoaiHopDongCollectionIdentifiers.push(phanLoaiHopDongIdentifier);
        return true;
      });
      return [...phanLoaiHopDongsToAdd, ...phanLoaiHopDongCollection];
    }
    return phanLoaiHopDongCollection;
  }
}
