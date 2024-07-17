import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHopDongCongChung, NewHopDongCongChung } from '../hop-dong-cong-chung.model';

export type PartialUpdateHopDongCongChung = Partial<IHopDongCongChung> & Pick<IHopDongCongChung, 'id'>;

type RestOf<T extends IHopDongCongChung | NewHopDongCongChung> = Omit<
  T,
  'ngayLapHd' | 'ngayThaoTac' | 'ngayHen' | 'ngayKyHd' | 'ngayRutTrich' | 'ngayThaoTacRutTrich'
> & {
  ngayLapHd?: string | null;
  ngayThaoTac?: string | null;
  ngayHen?: string | null;
  ngayKyHd?: string | null;
  ngayRutTrich?: string | null;
  ngayThaoTacRutTrich?: string | null;
};

export type RestHopDongCongChung = RestOf<IHopDongCongChung>;

export type NewRestHopDongCongChung = RestOf<NewHopDongCongChung>;

export type PartialUpdateRestHopDongCongChung = RestOf<PartialUpdateHopDongCongChung>;

export type EntityResponseType = HttpResponse<IHopDongCongChung>;
export type EntityArrayResponseType = HttpResponse<IHopDongCongChung[]>;

@Injectable({ providedIn: 'root' })
export class HopDongCongChungService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/hop-dong-cong-chungs');

  create(hopDongCongChung: NewHopDongCongChung): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hopDongCongChung);
    return this.http
      .post<RestHopDongCongChung>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(hopDongCongChung: IHopDongCongChung): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hopDongCongChung);
    return this.http
      .put<RestHopDongCongChung>(`${this.resourceUrl}/${this.getHopDongCongChungIdentifier(hopDongCongChung)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(hopDongCongChung: PartialUpdateHopDongCongChung): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hopDongCongChung);
    return this.http
      .patch<RestHopDongCongChung>(`${this.resourceUrl}/${this.getHopDongCongChungIdentifier(hopDongCongChung)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestHopDongCongChung>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestHopDongCongChung[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHopDongCongChungIdentifier(hopDongCongChung: Pick<IHopDongCongChung, 'id'>): number {
    return hopDongCongChung.id;
  }

  compareHopDongCongChung(o1: Pick<IHopDongCongChung, 'id'> | null, o2: Pick<IHopDongCongChung, 'id'> | null): boolean {
    return o1 && o2 ? this.getHopDongCongChungIdentifier(o1) === this.getHopDongCongChungIdentifier(o2) : o1 === o2;
  }

  addHopDongCongChungToCollectionIfMissing<Type extends Pick<IHopDongCongChung, 'id'>>(
    hopDongCongChungCollection: Type[],
    ...hopDongCongChungsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const hopDongCongChungs: Type[] = hopDongCongChungsToCheck.filter(isPresent);
    if (hopDongCongChungs.length > 0) {
      const hopDongCongChungCollectionIdentifiers = hopDongCongChungCollection.map(hopDongCongChungItem =>
        this.getHopDongCongChungIdentifier(hopDongCongChungItem),
      );
      const hopDongCongChungsToAdd = hopDongCongChungs.filter(hopDongCongChungItem => {
        const hopDongCongChungIdentifier = this.getHopDongCongChungIdentifier(hopDongCongChungItem);
        if (hopDongCongChungCollectionIdentifiers.includes(hopDongCongChungIdentifier)) {
          return false;
        }
        hopDongCongChungCollectionIdentifiers.push(hopDongCongChungIdentifier);
        return true;
      });
      return [...hopDongCongChungsToAdd, ...hopDongCongChungCollection];
    }
    return hopDongCongChungCollection;
  }

  protected convertDateFromClient<T extends IHopDongCongChung | NewHopDongCongChung | PartialUpdateHopDongCongChung>(
    hopDongCongChung: T,
  ): RestOf<T> {
    return {
      ...hopDongCongChung,
      ngayLapHd: hopDongCongChung.ngayLapHd?.format(DATE_FORMAT) ?? null,
      ngayThaoTac: hopDongCongChung.ngayThaoTac?.format(DATE_FORMAT) ?? null,
      ngayHen: hopDongCongChung.ngayHen?.format(DATE_FORMAT) ?? null,
      ngayKyHd: hopDongCongChung.ngayKyHd?.format(DATE_FORMAT) ?? null,
      ngayRutTrich: hopDongCongChung.ngayRutTrich?.format(DATE_FORMAT) ?? null,
      ngayThaoTacRutTrich: hopDongCongChung.ngayThaoTacRutTrich?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restHopDongCongChung: RestHopDongCongChung): IHopDongCongChung {
    return {
      ...restHopDongCongChung,
      ngayLapHd: restHopDongCongChung.ngayLapHd ? dayjs(restHopDongCongChung.ngayLapHd) : undefined,
      ngayThaoTac: restHopDongCongChung.ngayThaoTac ? dayjs(restHopDongCongChung.ngayThaoTac) : undefined,
      ngayHen: restHopDongCongChung.ngayHen ? dayjs(restHopDongCongChung.ngayHen) : undefined,
      ngayKyHd: restHopDongCongChung.ngayKyHd ? dayjs(restHopDongCongChung.ngayKyHd) : undefined,
      ngayRutTrich: restHopDongCongChung.ngayRutTrich ? dayjs(restHopDongCongChung.ngayRutTrich) : undefined,
      ngayThaoTacRutTrich: restHopDongCongChung.ngayThaoTacRutTrich ? dayjs(restHopDongCongChung.ngayThaoTacRutTrich) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestHopDongCongChung>): HttpResponse<IHopDongCongChung> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestHopDongCongChung[]>): HttpResponse<IHopDongCongChung[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
