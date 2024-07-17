import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucFileUploadKyso, NewDanhMucFileUploadKyso } from '../danh-muc-file-upload-kyso.model';

export type PartialUpdateDanhMucFileUploadKyso = Partial<IDanhMucFileUploadKyso> & Pick<IDanhMucFileUploadKyso, 'id'>;

type RestOf<T extends IDanhMucFileUploadKyso | NewDanhMucFileUploadKyso> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestDanhMucFileUploadKyso = RestOf<IDanhMucFileUploadKyso>;

export type NewRestDanhMucFileUploadKyso = RestOf<NewDanhMucFileUploadKyso>;

export type PartialUpdateRestDanhMucFileUploadKyso = RestOf<PartialUpdateDanhMucFileUploadKyso>;

export type EntityResponseType = HttpResponse<IDanhMucFileUploadKyso>;
export type EntityArrayResponseType = HttpResponse<IDanhMucFileUploadKyso[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucFileUploadKysoService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-file-upload-kysos');

  create(danhMucFileUploadKyso: NewDanhMucFileUploadKyso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucFileUploadKyso);
    return this.http
      .post<RestDanhMucFileUploadKyso>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(danhMucFileUploadKyso: IDanhMucFileUploadKyso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucFileUploadKyso);
    return this.http
      .put<RestDanhMucFileUploadKyso>(`${this.resourceUrl}/${this.getDanhMucFileUploadKysoIdentifier(danhMucFileUploadKyso)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(danhMucFileUploadKyso: PartialUpdateDanhMucFileUploadKyso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhMucFileUploadKyso);
    return this.http
      .patch<RestDanhMucFileUploadKyso>(`${this.resourceUrl}/${this.getDanhMucFileUploadKysoIdentifier(danhMucFileUploadKyso)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDanhMucFileUploadKyso>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDanhMucFileUploadKyso[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucFileUploadKysoIdentifier(danhMucFileUploadKyso: Pick<IDanhMucFileUploadKyso, 'id'>): number {
    return danhMucFileUploadKyso.id;
  }

  compareDanhMucFileUploadKyso(o1: Pick<IDanhMucFileUploadKyso, 'id'> | null, o2: Pick<IDanhMucFileUploadKyso, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucFileUploadKysoIdentifier(o1) === this.getDanhMucFileUploadKysoIdentifier(o2) : o1 === o2;
  }

  addDanhMucFileUploadKysoToCollectionIfMissing<Type extends Pick<IDanhMucFileUploadKyso, 'id'>>(
    danhMucFileUploadKysoCollection: Type[],
    ...danhMucFileUploadKysosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucFileUploadKysos: Type[] = danhMucFileUploadKysosToCheck.filter(isPresent);
    if (danhMucFileUploadKysos.length > 0) {
      const danhMucFileUploadKysoCollectionIdentifiers = danhMucFileUploadKysoCollection.map(danhMucFileUploadKysoItem =>
        this.getDanhMucFileUploadKysoIdentifier(danhMucFileUploadKysoItem),
      );
      const danhMucFileUploadKysosToAdd = danhMucFileUploadKysos.filter(danhMucFileUploadKysoItem => {
        const danhMucFileUploadKysoIdentifier = this.getDanhMucFileUploadKysoIdentifier(danhMucFileUploadKysoItem);
        if (danhMucFileUploadKysoCollectionIdentifiers.includes(danhMucFileUploadKysoIdentifier)) {
          return false;
        }
        danhMucFileUploadKysoCollectionIdentifiers.push(danhMucFileUploadKysoIdentifier);
        return true;
      });
      return [...danhMucFileUploadKysosToAdd, ...danhMucFileUploadKysoCollection];
    }
    return danhMucFileUploadKysoCollection;
  }

  protected convertDateFromClient<T extends IDanhMucFileUploadKyso | NewDanhMucFileUploadKyso | PartialUpdateDanhMucFileUploadKyso>(
    danhMucFileUploadKyso: T,
  ): RestOf<T> {
    return {
      ...danhMucFileUploadKyso,
      ngayThaoTac: danhMucFileUploadKyso.ngayThaoTac?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restDanhMucFileUploadKyso: RestDanhMucFileUploadKyso): IDanhMucFileUploadKyso {
    return {
      ...restDanhMucFileUploadKyso,
      ngayThaoTac: restDanhMucFileUploadKyso.ngayThaoTac ? dayjs(restDanhMucFileUploadKyso.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDanhMucFileUploadKyso>): HttpResponse<IDanhMucFileUploadKyso> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDanhMucFileUploadKyso[]>): HttpResponse<IDanhMucFileUploadKyso[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
