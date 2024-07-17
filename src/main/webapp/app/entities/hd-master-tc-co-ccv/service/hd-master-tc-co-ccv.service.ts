import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHdMasterTcCoCcv, NewHdMasterTcCoCcv } from '../hd-master-tc-co-ccv.model';

export type PartialUpdateHdMasterTcCoCcv = Partial<IHdMasterTcCoCcv> & Pick<IHdMasterTcCoCcv, 'id'>;

export type EntityResponseType = HttpResponse<IHdMasterTcCoCcv>;
export type EntityArrayResponseType = HttpResponse<IHdMasterTcCoCcv[]>;

@Injectable({ providedIn: 'root' })
export class HdMasterTcCoCcvService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/hd-master-tc-co-ccvs');

  create(hdMasterTcCoCcv: NewHdMasterTcCoCcv): Observable<EntityResponseType> {
    return this.http.post<IHdMasterTcCoCcv>(this.resourceUrl, hdMasterTcCoCcv, { observe: 'response' });
  }

  update(hdMasterTcCoCcv: IHdMasterTcCoCcv): Observable<EntityResponseType> {
    return this.http.put<IHdMasterTcCoCcv>(`${this.resourceUrl}/${this.getHdMasterTcCoCcvIdentifier(hdMasterTcCoCcv)}`, hdMasterTcCoCcv, {
      observe: 'response',
    });
  }

  partialUpdate(hdMasterTcCoCcv: PartialUpdateHdMasterTcCoCcv): Observable<EntityResponseType> {
    return this.http.patch<IHdMasterTcCoCcv>(`${this.resourceUrl}/${this.getHdMasterTcCoCcvIdentifier(hdMasterTcCoCcv)}`, hdMasterTcCoCcv, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHdMasterTcCoCcv>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHdMasterTcCoCcv[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHdMasterTcCoCcvIdentifier(hdMasterTcCoCcv: Pick<IHdMasterTcCoCcv, 'id'>): number {
    return hdMasterTcCoCcv.id;
  }

  compareHdMasterTcCoCcv(o1: Pick<IHdMasterTcCoCcv, 'id'> | null, o2: Pick<IHdMasterTcCoCcv, 'id'> | null): boolean {
    return o1 && o2 ? this.getHdMasterTcCoCcvIdentifier(o1) === this.getHdMasterTcCoCcvIdentifier(o2) : o1 === o2;
  }

  addHdMasterTcCoCcvToCollectionIfMissing<Type extends Pick<IHdMasterTcCoCcv, 'id'>>(
    hdMasterTcCoCcvCollection: Type[],
    ...hdMasterTcCoCcvsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const hdMasterTcCoCcvs: Type[] = hdMasterTcCoCcvsToCheck.filter(isPresent);
    if (hdMasterTcCoCcvs.length > 0) {
      const hdMasterTcCoCcvCollectionIdentifiers = hdMasterTcCoCcvCollection.map(hdMasterTcCoCcvItem =>
        this.getHdMasterTcCoCcvIdentifier(hdMasterTcCoCcvItem),
      );
      const hdMasterTcCoCcvsToAdd = hdMasterTcCoCcvs.filter(hdMasterTcCoCcvItem => {
        const hdMasterTcCoCcvIdentifier = this.getHdMasterTcCoCcvIdentifier(hdMasterTcCoCcvItem);
        if (hdMasterTcCoCcvCollectionIdentifiers.includes(hdMasterTcCoCcvIdentifier)) {
          return false;
        }
        hdMasterTcCoCcvCollectionIdentifiers.push(hdMasterTcCoCcvIdentifier);
        return true;
      });
      return [...hdMasterTcCoCcvsToAdd, ...hdMasterTcCoCcvCollection];
    }
    return hdMasterTcCoCcvCollection;
  }
}
