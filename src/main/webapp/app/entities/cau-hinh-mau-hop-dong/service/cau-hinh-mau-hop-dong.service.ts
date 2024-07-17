import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICauHinhMauHopDong, NewCauHinhMauHopDong } from '../cau-hinh-mau-hop-dong.model';

export type PartialUpdateCauHinhMauHopDong = Partial<ICauHinhMauHopDong> & Pick<ICauHinhMauHopDong, 'id'>;

type RestOf<T extends ICauHinhMauHopDong | NewCauHinhMauHopDong> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestCauHinhMauHopDong = RestOf<ICauHinhMauHopDong>;

export type NewRestCauHinhMauHopDong = RestOf<NewCauHinhMauHopDong>;

export type PartialUpdateRestCauHinhMauHopDong = RestOf<PartialUpdateCauHinhMauHopDong>;

export type EntityResponseType = HttpResponse<ICauHinhMauHopDong>;
export type EntityArrayResponseType = HttpResponse<ICauHinhMauHopDong[]>;

@Injectable({ providedIn: 'root' })
export class CauHinhMauHopDongService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cau-hinh-mau-hop-dongs');

  create(cauHinhMauHopDong: NewCauHinhMauHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cauHinhMauHopDong);
    return this.http
      .post<RestCauHinhMauHopDong>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cauHinhMauHopDong: ICauHinhMauHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cauHinhMauHopDong);
    return this.http
      .put<RestCauHinhMauHopDong>(`${this.resourceUrl}/${this.getCauHinhMauHopDongIdentifier(cauHinhMauHopDong)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cauHinhMauHopDong: PartialUpdateCauHinhMauHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cauHinhMauHopDong);
    return this.http
      .patch<RestCauHinhMauHopDong>(`${this.resourceUrl}/${this.getCauHinhMauHopDongIdentifier(cauHinhMauHopDong)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCauHinhMauHopDong>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCauHinhMauHopDong[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCauHinhMauHopDongIdentifier(cauHinhMauHopDong: Pick<ICauHinhMauHopDong, 'id'>): number {
    return cauHinhMauHopDong.id;
  }

  compareCauHinhMauHopDong(o1: Pick<ICauHinhMauHopDong, 'id'> | null, o2: Pick<ICauHinhMauHopDong, 'id'> | null): boolean {
    return o1 && o2 ? this.getCauHinhMauHopDongIdentifier(o1) === this.getCauHinhMauHopDongIdentifier(o2) : o1 === o2;
  }

  addCauHinhMauHopDongToCollectionIfMissing<Type extends Pick<ICauHinhMauHopDong, 'id'>>(
    cauHinhMauHopDongCollection: Type[],
    ...cauHinhMauHopDongsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cauHinhMauHopDongs: Type[] = cauHinhMauHopDongsToCheck.filter(isPresent);
    if (cauHinhMauHopDongs.length > 0) {
      const cauHinhMauHopDongCollectionIdentifiers = cauHinhMauHopDongCollection.map(cauHinhMauHopDongItem =>
        this.getCauHinhMauHopDongIdentifier(cauHinhMauHopDongItem),
      );
      const cauHinhMauHopDongsToAdd = cauHinhMauHopDongs.filter(cauHinhMauHopDongItem => {
        const cauHinhMauHopDongIdentifier = this.getCauHinhMauHopDongIdentifier(cauHinhMauHopDongItem);
        if (cauHinhMauHopDongCollectionIdentifiers.includes(cauHinhMauHopDongIdentifier)) {
          return false;
        }
        cauHinhMauHopDongCollectionIdentifiers.push(cauHinhMauHopDongIdentifier);
        return true;
      });
      return [...cauHinhMauHopDongsToAdd, ...cauHinhMauHopDongCollection];
    }
    return cauHinhMauHopDongCollection;
  }

  protected convertDateFromClient<T extends ICauHinhMauHopDong | NewCauHinhMauHopDong | PartialUpdateCauHinhMauHopDong>(
    cauHinhMauHopDong: T,
  ): RestOf<T> {
    return {
      ...cauHinhMauHopDong,
      ngayThaoTac: cauHinhMauHopDong.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCauHinhMauHopDong: RestCauHinhMauHopDong): ICauHinhMauHopDong {
    return {
      ...restCauHinhMauHopDong,
      ngayThaoTac: restCauHinhMauHopDong.ngayThaoTac ? dayjs(restCauHinhMauHopDong.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCauHinhMauHopDong>): HttpResponse<ICauHinhMauHopDong> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCauHinhMauHopDong[]>): HttpResponse<ICauHinhMauHopDong[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
