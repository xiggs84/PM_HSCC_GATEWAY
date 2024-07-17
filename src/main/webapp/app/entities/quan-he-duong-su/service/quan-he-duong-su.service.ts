import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuanHeDuongSu, NewQuanHeDuongSu } from '../quan-he-duong-su.model';

export type PartialUpdateQuanHeDuongSu = Partial<IQuanHeDuongSu> & Pick<IQuanHeDuongSu, 'id'>;

export type EntityResponseType = HttpResponse<IQuanHeDuongSu>;
export type EntityArrayResponseType = HttpResponse<IQuanHeDuongSu[]>;

@Injectable({ providedIn: 'root' })
export class QuanHeDuongSuService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quan-he-duong-sus');

  create(quanHeDuongSu: NewQuanHeDuongSu): Observable<EntityResponseType> {
    return this.http.post<IQuanHeDuongSu>(this.resourceUrl, quanHeDuongSu, { observe: 'response' });
  }

  update(quanHeDuongSu: IQuanHeDuongSu): Observable<EntityResponseType> {
    return this.http.put<IQuanHeDuongSu>(`${this.resourceUrl}/${this.getQuanHeDuongSuIdentifier(quanHeDuongSu)}`, quanHeDuongSu, {
      observe: 'response',
    });
  }

  partialUpdate(quanHeDuongSu: PartialUpdateQuanHeDuongSu): Observable<EntityResponseType> {
    return this.http.patch<IQuanHeDuongSu>(`${this.resourceUrl}/${this.getQuanHeDuongSuIdentifier(quanHeDuongSu)}`, quanHeDuongSu, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuanHeDuongSu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuanHeDuongSu[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getQuanHeDuongSuIdentifier(quanHeDuongSu: Pick<IQuanHeDuongSu, 'id'>): number {
    return quanHeDuongSu.id;
  }

  compareQuanHeDuongSu(o1: Pick<IQuanHeDuongSu, 'id'> | null, o2: Pick<IQuanHeDuongSu, 'id'> | null): boolean {
    return o1 && o2 ? this.getQuanHeDuongSuIdentifier(o1) === this.getQuanHeDuongSuIdentifier(o2) : o1 === o2;
  }

  addQuanHeDuongSuToCollectionIfMissing<Type extends Pick<IQuanHeDuongSu, 'id'>>(
    quanHeDuongSuCollection: Type[],
    ...quanHeDuongSusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const quanHeDuongSus: Type[] = quanHeDuongSusToCheck.filter(isPresent);
    if (quanHeDuongSus.length > 0) {
      const quanHeDuongSuCollectionIdentifiers = quanHeDuongSuCollection.map(quanHeDuongSuItem =>
        this.getQuanHeDuongSuIdentifier(quanHeDuongSuItem),
      );
      const quanHeDuongSusToAdd = quanHeDuongSus.filter(quanHeDuongSuItem => {
        const quanHeDuongSuIdentifier = this.getQuanHeDuongSuIdentifier(quanHeDuongSuItem);
        if (quanHeDuongSuCollectionIdentifiers.includes(quanHeDuongSuIdentifier)) {
          return false;
        }
        quanHeDuongSuCollectionIdentifiers.push(quanHeDuongSuIdentifier);
        return true;
      });
      return [...quanHeDuongSusToAdd, ...quanHeDuongSuCollection];
    }
    return quanHeDuongSuCollection;
  }
}
