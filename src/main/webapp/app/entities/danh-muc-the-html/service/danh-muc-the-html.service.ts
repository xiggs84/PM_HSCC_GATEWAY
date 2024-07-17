import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucTheHtml, NewDanhMucTheHtml } from '../danh-muc-the-html.model';

export type PartialUpdateDanhMucTheHtml = Partial<IDanhMucTheHtml> & Pick<IDanhMucTheHtml, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucTheHtml>;
export type EntityArrayResponseType = HttpResponse<IDanhMucTheHtml[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucTheHtmlService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-the-htmls');

  create(danhMucTheHtml: NewDanhMucTheHtml): Observable<EntityResponseType> {
    return this.http.post<IDanhMucTheHtml>(this.resourceUrl, danhMucTheHtml, { observe: 'response' });
  }

  update(danhMucTheHtml: IDanhMucTheHtml): Observable<EntityResponseType> {
    return this.http.put<IDanhMucTheHtml>(`${this.resourceUrl}/${this.getDanhMucTheHtmlIdentifier(danhMucTheHtml)}`, danhMucTheHtml, {
      observe: 'response',
    });
  }

  partialUpdate(danhMucTheHtml: PartialUpdateDanhMucTheHtml): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucTheHtml>(`${this.resourceUrl}/${this.getDanhMucTheHtmlIdentifier(danhMucTheHtml)}`, danhMucTheHtml, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucTheHtml>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucTheHtml[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucTheHtmlIdentifier(danhMucTheHtml: Pick<IDanhMucTheHtml, 'id'>): number {
    return danhMucTheHtml.id;
  }

  compareDanhMucTheHtml(o1: Pick<IDanhMucTheHtml, 'id'> | null, o2: Pick<IDanhMucTheHtml, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucTheHtmlIdentifier(o1) === this.getDanhMucTheHtmlIdentifier(o2) : o1 === o2;
  }

  addDanhMucTheHtmlToCollectionIfMissing<Type extends Pick<IDanhMucTheHtml, 'id'>>(
    danhMucTheHtmlCollection: Type[],
    ...danhMucTheHtmlsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucTheHtmls: Type[] = danhMucTheHtmlsToCheck.filter(isPresent);
    if (danhMucTheHtmls.length > 0) {
      const danhMucTheHtmlCollectionIdentifiers = danhMucTheHtmlCollection.map(danhMucTheHtmlItem =>
        this.getDanhMucTheHtmlIdentifier(danhMucTheHtmlItem),
      );
      const danhMucTheHtmlsToAdd = danhMucTheHtmls.filter(danhMucTheHtmlItem => {
        const danhMucTheHtmlIdentifier = this.getDanhMucTheHtmlIdentifier(danhMucTheHtmlItem);
        if (danhMucTheHtmlCollectionIdentifiers.includes(danhMucTheHtmlIdentifier)) {
          return false;
        }
        danhMucTheHtmlCollectionIdentifiers.push(danhMucTheHtmlIdentifier);
        return true;
      });
      return [...danhMucTheHtmlsToAdd, ...danhMucTheHtmlCollection];
    }
    return danhMucTheHtmlCollection;
  }
}
