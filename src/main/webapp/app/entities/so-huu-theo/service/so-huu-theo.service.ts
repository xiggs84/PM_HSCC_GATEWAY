import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISoHuuTheo, NewSoHuuTheo } from '../so-huu-theo.model';

export type PartialUpdateSoHuuTheo = Partial<ISoHuuTheo> & Pick<ISoHuuTheo, 'id'>;

export type EntityResponseType = HttpResponse<ISoHuuTheo>;
export type EntityArrayResponseType = HttpResponse<ISoHuuTheo[]>;

@Injectable({ providedIn: 'root' })
export class SoHuuTheoService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/so-huu-theos');

  create(soHuuTheo: NewSoHuuTheo): Observable<EntityResponseType> {
    return this.http.post<ISoHuuTheo>(this.resourceUrl, soHuuTheo, { observe: 'response' });
  }

  update(soHuuTheo: ISoHuuTheo): Observable<EntityResponseType> {
    return this.http.put<ISoHuuTheo>(`${this.resourceUrl}/${this.getSoHuuTheoIdentifier(soHuuTheo)}`, soHuuTheo, { observe: 'response' });
  }

  partialUpdate(soHuuTheo: PartialUpdateSoHuuTheo): Observable<EntityResponseType> {
    return this.http.patch<ISoHuuTheo>(`${this.resourceUrl}/${this.getSoHuuTheoIdentifier(soHuuTheo)}`, soHuuTheo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISoHuuTheo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISoHuuTheo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSoHuuTheoIdentifier(soHuuTheo: Pick<ISoHuuTheo, 'id'>): number {
    return soHuuTheo.id;
  }

  compareSoHuuTheo(o1: Pick<ISoHuuTheo, 'id'> | null, o2: Pick<ISoHuuTheo, 'id'> | null): boolean {
    return o1 && o2 ? this.getSoHuuTheoIdentifier(o1) === this.getSoHuuTheoIdentifier(o2) : o1 === o2;
  }

  addSoHuuTheoToCollectionIfMissing<Type extends Pick<ISoHuuTheo, 'id'>>(
    soHuuTheoCollection: Type[],
    ...soHuuTheosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const soHuuTheos: Type[] = soHuuTheosToCheck.filter(isPresent);
    if (soHuuTheos.length > 0) {
      const soHuuTheoCollectionIdentifiers = soHuuTheoCollection.map(soHuuTheoItem => this.getSoHuuTheoIdentifier(soHuuTheoItem));
      const soHuuTheosToAdd = soHuuTheos.filter(soHuuTheoItem => {
        const soHuuTheoIdentifier = this.getSoHuuTheoIdentifier(soHuuTheoItem);
        if (soHuuTheoCollectionIdentifiers.includes(soHuuTheoIdentifier)) {
          return false;
        }
        soHuuTheoCollectionIdentifiers.push(soHuuTheoIdentifier);
        return true;
      });
      return [...soHuuTheosToAdd, ...soHuuTheoCollection];
    }
    return soHuuTheoCollection;
  }
}
