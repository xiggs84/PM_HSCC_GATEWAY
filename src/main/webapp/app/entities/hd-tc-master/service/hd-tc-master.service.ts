import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHdTcMaster, NewHdTcMaster } from '../hd-tc-master.model';

export type PartialUpdateHdTcMaster = Partial<IHdTcMaster> & Pick<IHdTcMaster, 'id'>;

type RestOf<T extends IHdTcMaster | NewHdTcMaster> = Omit<T, 'ngayLapHd' | 'ngayThaoTac' | 'ngayHen' | 'ngayKyHd' | 'ngayRutTrich'> & {
  ngayLapHd?: string | null;
  ngayThaoTac?: string | null;
  ngayHen?: string | null;
  ngayKyHd?: string | null;
  ngayRutTrich?: string | null;
};

export type RestHdTcMaster = RestOf<IHdTcMaster>;

export type NewRestHdTcMaster = RestOf<NewHdTcMaster>;

export type PartialUpdateRestHdTcMaster = RestOf<PartialUpdateHdTcMaster>;

export type EntityResponseType = HttpResponse<IHdTcMaster>;
export type EntityArrayResponseType = HttpResponse<IHdTcMaster[]>;

@Injectable({ providedIn: 'root' })
export class HdTcMasterService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/hd-tc-masters');

  create(hdTcMaster: NewHdTcMaster): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hdTcMaster);
    return this.http
      .post<RestHdTcMaster>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(hdTcMaster: IHdTcMaster): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hdTcMaster);
    return this.http
      .put<RestHdTcMaster>(`${this.resourceUrl}/${this.getHdTcMasterIdentifier(hdTcMaster)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(hdTcMaster: PartialUpdateHdTcMaster): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hdTcMaster);
    return this.http
      .patch<RestHdTcMaster>(`${this.resourceUrl}/${this.getHdTcMasterIdentifier(hdTcMaster)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestHdTcMaster>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestHdTcMaster[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHdTcMasterIdentifier(hdTcMaster: Pick<IHdTcMaster, 'id'>): number {
    return hdTcMaster.id;
  }

  compareHdTcMaster(o1: Pick<IHdTcMaster, 'id'> | null, o2: Pick<IHdTcMaster, 'id'> | null): boolean {
    return o1 && o2 ? this.getHdTcMasterIdentifier(o1) === this.getHdTcMasterIdentifier(o2) : o1 === o2;
  }

  addHdTcMasterToCollectionIfMissing<Type extends Pick<IHdTcMaster, 'id'>>(
    hdTcMasterCollection: Type[],
    ...hdTcMastersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const hdTcMasters: Type[] = hdTcMastersToCheck.filter(isPresent);
    if (hdTcMasters.length > 0) {
      const hdTcMasterCollectionIdentifiers = hdTcMasterCollection.map(hdTcMasterItem => this.getHdTcMasterIdentifier(hdTcMasterItem));
      const hdTcMastersToAdd = hdTcMasters.filter(hdTcMasterItem => {
        const hdTcMasterIdentifier = this.getHdTcMasterIdentifier(hdTcMasterItem);
        if (hdTcMasterCollectionIdentifiers.includes(hdTcMasterIdentifier)) {
          return false;
        }
        hdTcMasterCollectionIdentifiers.push(hdTcMasterIdentifier);
        return true;
      });
      return [...hdTcMastersToAdd, ...hdTcMasterCollection];
    }
    return hdTcMasterCollection;
  }

  protected convertDateFromClient<T extends IHdTcMaster | NewHdTcMaster | PartialUpdateHdTcMaster>(hdTcMaster: T): RestOf<T> {
    return {
      ...hdTcMaster,
      ngayLapHd: hdTcMaster.ngayLapHd?.format(DATE_FORMAT) ?? null,
      ngayThaoTac: hdTcMaster.ngayThaoTac?.format(DATE_FORMAT) ?? null,
      ngayHen: hdTcMaster.ngayHen?.format(DATE_FORMAT) ?? null,
      ngayKyHd: hdTcMaster.ngayKyHd?.format(DATE_FORMAT) ?? null,
      ngayRutTrich: hdTcMaster.ngayRutTrich?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restHdTcMaster: RestHdTcMaster): IHdTcMaster {
    return {
      ...restHdTcMaster,
      ngayLapHd: restHdTcMaster.ngayLapHd ? dayjs(restHdTcMaster.ngayLapHd) : undefined,
      ngayThaoTac: restHdTcMaster.ngayThaoTac ? dayjs(restHdTcMaster.ngayThaoTac) : undefined,
      ngayHen: restHdTcMaster.ngayHen ? dayjs(restHdTcMaster.ngayHen) : undefined,
      ngayKyHd: restHdTcMaster.ngayKyHd ? dayjs(restHdTcMaster.ngayKyHd) : undefined,
      ngayRutTrich: restHdTcMaster.ngayRutTrich ? dayjs(restHdTcMaster.ngayRutTrich) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestHdTcMaster>): HttpResponse<IHdTcMaster> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestHdTcMaster[]>): HttpResponse<IHdTcMaster[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
