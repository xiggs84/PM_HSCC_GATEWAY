import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHdMasterCoCcv, NewHdMasterCoCcv } from '../hd-master-co-ccv.model';

export type PartialUpdateHdMasterCoCcv = Partial<IHdMasterCoCcv> & Pick<IHdMasterCoCcv, 'id'>;

export type EntityResponseType = HttpResponse<IHdMasterCoCcv>;
export type EntityArrayResponseType = HttpResponse<IHdMasterCoCcv[]>;

@Injectable({ providedIn: 'root' })
export class HdMasterCoCcvService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/hd-master-co-ccvs');

  create(hdMasterCoCcv: NewHdMasterCoCcv): Observable<EntityResponseType> {
    return this.http.post<IHdMasterCoCcv>(this.resourceUrl, hdMasterCoCcv, { observe: 'response' });
  }

  update(hdMasterCoCcv: IHdMasterCoCcv): Observable<EntityResponseType> {
    return this.http.put<IHdMasterCoCcv>(`${this.resourceUrl}/${this.getHdMasterCoCcvIdentifier(hdMasterCoCcv)}`, hdMasterCoCcv, {
      observe: 'response',
    });
  }

  partialUpdate(hdMasterCoCcv: PartialUpdateHdMasterCoCcv): Observable<EntityResponseType> {
    return this.http.patch<IHdMasterCoCcv>(`${this.resourceUrl}/${this.getHdMasterCoCcvIdentifier(hdMasterCoCcv)}`, hdMasterCoCcv, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHdMasterCoCcv>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHdMasterCoCcv[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHdMasterCoCcvIdentifier(hdMasterCoCcv: Pick<IHdMasterCoCcv, 'id'>): number {
    return hdMasterCoCcv.id;
  }

  compareHdMasterCoCcv(o1: Pick<IHdMasterCoCcv, 'id'> | null, o2: Pick<IHdMasterCoCcv, 'id'> | null): boolean {
    return o1 && o2 ? this.getHdMasterCoCcvIdentifier(o1) === this.getHdMasterCoCcvIdentifier(o2) : o1 === o2;
  }

  addHdMasterCoCcvToCollectionIfMissing<Type extends Pick<IHdMasterCoCcv, 'id'>>(
    hdMasterCoCcvCollection: Type[],
    ...hdMasterCoCcvsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const hdMasterCoCcvs: Type[] = hdMasterCoCcvsToCheck.filter(isPresent);
    if (hdMasterCoCcvs.length > 0) {
      const hdMasterCoCcvCollectionIdentifiers = hdMasterCoCcvCollection.map(hdMasterCoCcvItem =>
        this.getHdMasterCoCcvIdentifier(hdMasterCoCcvItem),
      );
      const hdMasterCoCcvsToAdd = hdMasterCoCcvs.filter(hdMasterCoCcvItem => {
        const hdMasterCoCcvIdentifier = this.getHdMasterCoCcvIdentifier(hdMasterCoCcvItem);
        if (hdMasterCoCcvCollectionIdentifiers.includes(hdMasterCoCcvIdentifier)) {
          return false;
        }
        hdMasterCoCcvCollectionIdentifiers.push(hdMasterCoCcvIdentifier);
        return true;
      });
      return [...hdMasterCoCcvsToAdd, ...hdMasterCoCcvCollection];
    }
    return hdMasterCoCcvCollection;
  }
}
