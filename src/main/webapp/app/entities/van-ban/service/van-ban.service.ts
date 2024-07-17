import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVanBan, NewVanBan } from '../van-ban.model';

export type PartialUpdateVanBan = Partial<IVanBan> & Pick<IVanBan, 'id'>;

type RestOf<T extends IVanBan | NewVanBan> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestVanBan = RestOf<IVanBan>;

export type NewRestVanBan = RestOf<NewVanBan>;

export type PartialUpdateRestVanBan = RestOf<PartialUpdateVanBan>;

export type EntityResponseType = HttpResponse<IVanBan>;
export type EntityArrayResponseType = HttpResponse<IVanBan[]>;

@Injectable({ providedIn: 'root' })
export class VanBanService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/van-bans');

  create(vanBan: NewVanBan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vanBan);
    return this.http
      .post<RestVanBan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(vanBan: IVanBan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vanBan);
    return this.http
      .put<RestVanBan>(`${this.resourceUrl}/${this.getVanBanIdentifier(vanBan)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(vanBan: PartialUpdateVanBan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vanBan);
    return this.http
      .patch<RestVanBan>(`${this.resourceUrl}/${this.getVanBanIdentifier(vanBan)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestVanBan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestVanBan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getVanBanIdentifier(vanBan: Pick<IVanBan, 'id'>): number {
    return vanBan.id;
  }

  compareVanBan(o1: Pick<IVanBan, 'id'> | null, o2: Pick<IVanBan, 'id'> | null): boolean {
    return o1 && o2 ? this.getVanBanIdentifier(o1) === this.getVanBanIdentifier(o2) : o1 === o2;
  }

  addVanBanToCollectionIfMissing<Type extends Pick<IVanBan, 'id'>>(
    vanBanCollection: Type[],
    ...vanBansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const vanBans: Type[] = vanBansToCheck.filter(isPresent);
    if (vanBans.length > 0) {
      const vanBanCollectionIdentifiers = vanBanCollection.map(vanBanItem => this.getVanBanIdentifier(vanBanItem));
      const vanBansToAdd = vanBans.filter(vanBanItem => {
        const vanBanIdentifier = this.getVanBanIdentifier(vanBanItem);
        if (vanBanCollectionIdentifiers.includes(vanBanIdentifier)) {
          return false;
        }
        vanBanCollectionIdentifiers.push(vanBanIdentifier);
        return true;
      });
      return [...vanBansToAdd, ...vanBanCollection];
    }
    return vanBanCollection;
  }

  protected convertDateFromClient<T extends IVanBan | NewVanBan | PartialUpdateVanBan>(vanBan: T): RestOf<T> {
    return {
      ...vanBan,
      ngayThaoTac: vanBan.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restVanBan: RestVanBan): IVanBan {
    return {
      ...restVanBan,
      ngayThaoTac: restVanBan.ngayThaoTac ? dayjs(restVanBan.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestVanBan>): HttpResponse<IVanBan> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestVanBan[]>): HttpResponse<IVanBan[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
