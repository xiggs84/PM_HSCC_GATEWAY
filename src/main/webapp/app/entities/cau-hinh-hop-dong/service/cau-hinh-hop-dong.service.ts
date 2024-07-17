import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICauHinhHopDong, NewCauHinhHopDong } from '../cau-hinh-hop-dong.model';

export type PartialUpdateCauHinhHopDong = Partial<ICauHinhHopDong> & Pick<ICauHinhHopDong, 'id'>;

export type EntityResponseType = HttpResponse<ICauHinhHopDong>;
export type EntityArrayResponseType = HttpResponse<ICauHinhHopDong[]>;

@Injectable({ providedIn: 'root' })
export class CauHinhHopDongService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cau-hinh-hop-dongs');

  create(cauHinhHopDong: NewCauHinhHopDong): Observable<EntityResponseType> {
    return this.http.post<ICauHinhHopDong>(this.resourceUrl, cauHinhHopDong, { observe: 'response' });
  }

  update(cauHinhHopDong: ICauHinhHopDong): Observable<EntityResponseType> {
    return this.http.put<ICauHinhHopDong>(`${this.resourceUrl}/${this.getCauHinhHopDongIdentifier(cauHinhHopDong)}`, cauHinhHopDong, {
      observe: 'response',
    });
  }

  partialUpdate(cauHinhHopDong: PartialUpdateCauHinhHopDong): Observable<EntityResponseType> {
    return this.http.patch<ICauHinhHopDong>(`${this.resourceUrl}/${this.getCauHinhHopDongIdentifier(cauHinhHopDong)}`, cauHinhHopDong, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICauHinhHopDong>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICauHinhHopDong[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCauHinhHopDongIdentifier(cauHinhHopDong: Pick<ICauHinhHopDong, 'id'>): number {
    return cauHinhHopDong.id;
  }

  compareCauHinhHopDong(o1: Pick<ICauHinhHopDong, 'id'> | null, o2: Pick<ICauHinhHopDong, 'id'> | null): boolean {
    return o1 && o2 ? this.getCauHinhHopDongIdentifier(o1) === this.getCauHinhHopDongIdentifier(o2) : o1 === o2;
  }

  addCauHinhHopDongToCollectionIfMissing<Type extends Pick<ICauHinhHopDong, 'id'>>(
    cauHinhHopDongCollection: Type[],
    ...cauHinhHopDongsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cauHinhHopDongs: Type[] = cauHinhHopDongsToCheck.filter(isPresent);
    if (cauHinhHopDongs.length > 0) {
      const cauHinhHopDongCollectionIdentifiers = cauHinhHopDongCollection.map(cauHinhHopDongItem =>
        this.getCauHinhHopDongIdentifier(cauHinhHopDongItem),
      );
      const cauHinhHopDongsToAdd = cauHinhHopDongs.filter(cauHinhHopDongItem => {
        const cauHinhHopDongIdentifier = this.getCauHinhHopDongIdentifier(cauHinhHopDongItem);
        if (cauHinhHopDongCollectionIdentifiers.includes(cauHinhHopDongIdentifier)) {
          return false;
        }
        cauHinhHopDongCollectionIdentifiers.push(cauHinhHopDongIdentifier);
        return true;
      });
      return [...cauHinhHopDongsToAdd, ...cauHinhHopDongCollection];
    }
    return cauHinhHopDongCollection;
  }
}
