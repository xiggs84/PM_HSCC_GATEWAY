import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDmNoiCapGpdkx, NewDmNoiCapGpdkx } from '../dm-noi-cap-gpdkx.model';

export type PartialUpdateDmNoiCapGpdkx = Partial<IDmNoiCapGpdkx> & Pick<IDmNoiCapGpdkx, 'id'>;

export type EntityResponseType = HttpResponse<IDmNoiCapGpdkx>;
export type EntityArrayResponseType = HttpResponse<IDmNoiCapGpdkx[]>;

@Injectable({ providedIn: 'root' })
export class DmNoiCapGpdkxService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dm-noi-cap-gpdkxes');

  create(dmNoiCapGpdkx: NewDmNoiCapGpdkx): Observable<EntityResponseType> {
    return this.http.post<IDmNoiCapGpdkx>(this.resourceUrl, dmNoiCapGpdkx, { observe: 'response' });
  }

  update(dmNoiCapGpdkx: IDmNoiCapGpdkx): Observable<EntityResponseType> {
    return this.http.put<IDmNoiCapGpdkx>(`${this.resourceUrl}/${this.getDmNoiCapGpdkxIdentifier(dmNoiCapGpdkx)}`, dmNoiCapGpdkx, {
      observe: 'response',
    });
  }

  partialUpdate(dmNoiCapGpdkx: PartialUpdateDmNoiCapGpdkx): Observable<EntityResponseType> {
    return this.http.patch<IDmNoiCapGpdkx>(`${this.resourceUrl}/${this.getDmNoiCapGpdkxIdentifier(dmNoiCapGpdkx)}`, dmNoiCapGpdkx, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDmNoiCapGpdkx>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDmNoiCapGpdkx[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDmNoiCapGpdkxIdentifier(dmNoiCapGpdkx: Pick<IDmNoiCapGpdkx, 'id'>): number {
    return dmNoiCapGpdkx.id;
  }

  compareDmNoiCapGpdkx(o1: Pick<IDmNoiCapGpdkx, 'id'> | null, o2: Pick<IDmNoiCapGpdkx, 'id'> | null): boolean {
    return o1 && o2 ? this.getDmNoiCapGpdkxIdentifier(o1) === this.getDmNoiCapGpdkxIdentifier(o2) : o1 === o2;
  }

  addDmNoiCapGpdkxToCollectionIfMissing<Type extends Pick<IDmNoiCapGpdkx, 'id'>>(
    dmNoiCapGpdkxCollection: Type[],
    ...dmNoiCapGpdkxesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dmNoiCapGpdkxes: Type[] = dmNoiCapGpdkxesToCheck.filter(isPresent);
    if (dmNoiCapGpdkxes.length > 0) {
      const dmNoiCapGpdkxCollectionIdentifiers = dmNoiCapGpdkxCollection.map(dmNoiCapGpdkxItem =>
        this.getDmNoiCapGpdkxIdentifier(dmNoiCapGpdkxItem),
      );
      const dmNoiCapGpdkxesToAdd = dmNoiCapGpdkxes.filter(dmNoiCapGpdkxItem => {
        const dmNoiCapGpdkxIdentifier = this.getDmNoiCapGpdkxIdentifier(dmNoiCapGpdkxItem);
        if (dmNoiCapGpdkxCollectionIdentifiers.includes(dmNoiCapGpdkxIdentifier)) {
          return false;
        }
        dmNoiCapGpdkxCollectionIdentifiers.push(dmNoiCapGpdkxIdentifier);
        return true;
      });
      return [...dmNoiCapGpdkxesToAdd, ...dmNoiCapGpdkxCollection];
    }
    return dmNoiCapGpdkxCollection;
  }
}
