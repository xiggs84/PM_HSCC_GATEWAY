import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFileidDrive, NewFileidDrive } from '../fileid-drive.model';

export type PartialUpdateFileidDrive = Partial<IFileidDrive> & Pick<IFileidDrive, 'id'>;

export type EntityResponseType = HttpResponse<IFileidDrive>;
export type EntityArrayResponseType = HttpResponse<IFileidDrive[]>;

@Injectable({ providedIn: 'root' })
export class FileidDriveService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fileid-drives');

  create(fileidDrive: NewFileidDrive): Observable<EntityResponseType> {
    return this.http.post<IFileidDrive>(this.resourceUrl, fileidDrive, { observe: 'response' });
  }

  update(fileidDrive: IFileidDrive): Observable<EntityResponseType> {
    return this.http.put<IFileidDrive>(`${this.resourceUrl}/${this.getFileidDriveIdentifier(fileidDrive)}`, fileidDrive, {
      observe: 'response',
    });
  }

  partialUpdate(fileidDrive: PartialUpdateFileidDrive): Observable<EntityResponseType> {
    return this.http.patch<IFileidDrive>(`${this.resourceUrl}/${this.getFileidDriveIdentifier(fileidDrive)}`, fileidDrive, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFileidDrive>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFileidDrive[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFileidDriveIdentifier(fileidDrive: Pick<IFileidDrive, 'id'>): number {
    return fileidDrive.id;
  }

  compareFileidDrive(o1: Pick<IFileidDrive, 'id'> | null, o2: Pick<IFileidDrive, 'id'> | null): boolean {
    return o1 && o2 ? this.getFileidDriveIdentifier(o1) === this.getFileidDriveIdentifier(o2) : o1 === o2;
  }

  addFileidDriveToCollectionIfMissing<Type extends Pick<IFileidDrive, 'id'>>(
    fileidDriveCollection: Type[],
    ...fileidDrivesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fileidDrives: Type[] = fileidDrivesToCheck.filter(isPresent);
    if (fileidDrives.length > 0) {
      const fileidDriveCollectionIdentifiers = fileidDriveCollection.map(fileidDriveItem => this.getFileidDriveIdentifier(fileidDriveItem));
      const fileidDrivesToAdd = fileidDrives.filter(fileidDriveItem => {
        const fileidDriveIdentifier = this.getFileidDriveIdentifier(fileidDriveItem);
        if (fileidDriveCollectionIdentifiers.includes(fileidDriveIdentifier)) {
          return false;
        }
        fileidDriveCollectionIdentifiers.push(fileidDriveIdentifier);
        return true;
      });
      return [...fileidDrivesToAdd, ...fileidDriveCollection];
    }
    return fileidDriveCollection;
  }
}
