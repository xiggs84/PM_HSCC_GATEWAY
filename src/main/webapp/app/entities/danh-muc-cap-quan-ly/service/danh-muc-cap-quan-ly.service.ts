import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucCapQuanLy, NewDanhMucCapQuanLy } from '../danh-muc-cap-quan-ly.model';

export type PartialUpdateDanhMucCapQuanLy = Partial<IDanhMucCapQuanLy> & Pick<IDanhMucCapQuanLy, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucCapQuanLy>;
export type EntityArrayResponseType = HttpResponse<IDanhMucCapQuanLy[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucCapQuanLyService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-cap-quan-lies');

  create(danhMucCapQuanLy: NewDanhMucCapQuanLy): Observable<EntityResponseType> {
    return this.http.post<IDanhMucCapQuanLy>(this.resourceUrl, danhMucCapQuanLy, { observe: 'response' });
  }

  update(danhMucCapQuanLy: IDanhMucCapQuanLy): Observable<EntityResponseType> {
    return this.http.put<IDanhMucCapQuanLy>(
      `${this.resourceUrl}/${this.getDanhMucCapQuanLyIdentifier(danhMucCapQuanLy)}`,
      danhMucCapQuanLy,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucCapQuanLy: PartialUpdateDanhMucCapQuanLy): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucCapQuanLy>(
      `${this.resourceUrl}/${this.getDanhMucCapQuanLyIdentifier(danhMucCapQuanLy)}`,
      danhMucCapQuanLy,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucCapQuanLy>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucCapQuanLy[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucCapQuanLyIdentifier(danhMucCapQuanLy: Pick<IDanhMucCapQuanLy, 'id'>): number {
    return danhMucCapQuanLy.id;
  }

  compareDanhMucCapQuanLy(o1: Pick<IDanhMucCapQuanLy, 'id'> | null, o2: Pick<IDanhMucCapQuanLy, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhMucCapQuanLyIdentifier(o1) === this.getDanhMucCapQuanLyIdentifier(o2) : o1 === o2;
  }

  addDanhMucCapQuanLyToCollectionIfMissing<Type extends Pick<IDanhMucCapQuanLy, 'id'>>(
    danhMucCapQuanLyCollection: Type[],
    ...danhMucCapQuanLiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucCapQuanLies: Type[] = danhMucCapQuanLiesToCheck.filter(isPresent);
    if (danhMucCapQuanLies.length > 0) {
      const danhMucCapQuanLyCollectionIdentifiers = danhMucCapQuanLyCollection.map(danhMucCapQuanLyItem =>
        this.getDanhMucCapQuanLyIdentifier(danhMucCapQuanLyItem),
      );
      const danhMucCapQuanLiesToAdd = danhMucCapQuanLies.filter(danhMucCapQuanLyItem => {
        const danhMucCapQuanLyIdentifier = this.getDanhMucCapQuanLyIdentifier(danhMucCapQuanLyItem);
        if (danhMucCapQuanLyCollectionIdentifiers.includes(danhMucCapQuanLyIdentifier)) {
          return false;
        }
        danhMucCapQuanLyCollectionIdentifiers.push(danhMucCapQuanLyIdentifier);
        return true;
      });
      return [...danhMucCapQuanLiesToAdd, ...danhMucCapQuanLyCollection];
    }
    return danhMucCapQuanLyCollection;
  }
}
