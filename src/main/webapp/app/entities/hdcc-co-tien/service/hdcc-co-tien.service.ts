import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHdccCoTien, NewHdccCoTien } from '../hdcc-co-tien.model';

export type PartialUpdateHdccCoTien = Partial<IHdccCoTien> & Pick<IHdccCoTien, 'id'>;

export type EntityResponseType = HttpResponse<IHdccCoTien>;
export type EntityArrayResponseType = HttpResponse<IHdccCoTien[]>;

@Injectable({ providedIn: 'root' })
export class HdccCoTienService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/hdcc-co-tiens');

  create(hdccCoTien: NewHdccCoTien): Observable<EntityResponseType> {
    return this.http.post<IHdccCoTien>(this.resourceUrl, hdccCoTien, { observe: 'response' });
  }

  update(hdccCoTien: IHdccCoTien): Observable<EntityResponseType> {
    return this.http.put<IHdccCoTien>(`${this.resourceUrl}/${this.getHdccCoTienIdentifier(hdccCoTien)}`, hdccCoTien, {
      observe: 'response',
    });
  }

  partialUpdate(hdccCoTien: PartialUpdateHdccCoTien): Observable<EntityResponseType> {
    return this.http.patch<IHdccCoTien>(`${this.resourceUrl}/${this.getHdccCoTienIdentifier(hdccCoTien)}`, hdccCoTien, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHdccCoTien>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHdccCoTien[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHdccCoTienIdentifier(hdccCoTien: Pick<IHdccCoTien, 'id'>): number {
    return hdccCoTien.id;
  }

  compareHdccCoTien(o1: Pick<IHdccCoTien, 'id'> | null, o2: Pick<IHdccCoTien, 'id'> | null): boolean {
    return o1 && o2 ? this.getHdccCoTienIdentifier(o1) === this.getHdccCoTienIdentifier(o2) : o1 === o2;
  }

  addHdccCoTienToCollectionIfMissing<Type extends Pick<IHdccCoTien, 'id'>>(
    hdccCoTienCollection: Type[],
    ...hdccCoTiensToCheck: (Type | null | undefined)[]
  ): Type[] {
    const hdccCoTiens: Type[] = hdccCoTiensToCheck.filter(isPresent);
    if (hdccCoTiens.length > 0) {
      const hdccCoTienCollectionIdentifiers = hdccCoTienCollection.map(hdccCoTienItem => this.getHdccCoTienIdentifier(hdccCoTienItem));
      const hdccCoTiensToAdd = hdccCoTiens.filter(hdccCoTienItem => {
        const hdccCoTienIdentifier = this.getHdccCoTienIdentifier(hdccCoTienItem);
        if (hdccCoTienCollectionIdentifiers.includes(hdccCoTienIdentifier)) {
          return false;
        }
        hdccCoTienCollectionIdentifiers.push(hdccCoTienIdentifier);
        return true;
      });
      return [...hdccCoTiensToAdd, ...hdccCoTienCollection];
    }
    return hdccCoTienCollection;
  }
}
