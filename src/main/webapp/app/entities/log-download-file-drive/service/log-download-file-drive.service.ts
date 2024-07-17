import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILogDownloadFileDrive, NewLogDownloadFileDrive } from '../log-download-file-drive.model';

export type PartialUpdateLogDownloadFileDrive = Partial<ILogDownloadFileDrive> & Pick<ILogDownloadFileDrive, 'id'>;

type RestOf<T extends ILogDownloadFileDrive | NewLogDownloadFileDrive> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestLogDownloadFileDrive = RestOf<ILogDownloadFileDrive>;

export type NewRestLogDownloadFileDrive = RestOf<NewLogDownloadFileDrive>;

export type PartialUpdateRestLogDownloadFileDrive = RestOf<PartialUpdateLogDownloadFileDrive>;

export type EntityResponseType = HttpResponse<ILogDownloadFileDrive>;
export type EntityArrayResponseType = HttpResponse<ILogDownloadFileDrive[]>;

@Injectable({ providedIn: 'root' })
export class LogDownloadFileDriveService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/log-download-file-drives');

  create(logDownloadFileDrive: NewLogDownloadFileDrive): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logDownloadFileDrive);
    return this.http
      .post<RestLogDownloadFileDrive>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(logDownloadFileDrive: ILogDownloadFileDrive): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logDownloadFileDrive);
    return this.http
      .put<RestLogDownloadFileDrive>(`${this.resourceUrl}/${this.getLogDownloadFileDriveIdentifier(logDownloadFileDrive)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(logDownloadFileDrive: PartialUpdateLogDownloadFileDrive): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logDownloadFileDrive);
    return this.http
      .patch<RestLogDownloadFileDrive>(`${this.resourceUrl}/${this.getLogDownloadFileDriveIdentifier(logDownloadFileDrive)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestLogDownloadFileDrive>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLogDownloadFileDrive[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLogDownloadFileDriveIdentifier(logDownloadFileDrive: Pick<ILogDownloadFileDrive, 'id'>): number {
    return logDownloadFileDrive.id;
  }

  compareLogDownloadFileDrive(o1: Pick<ILogDownloadFileDrive, 'id'> | null, o2: Pick<ILogDownloadFileDrive, 'id'> | null): boolean {
    return o1 && o2 ? this.getLogDownloadFileDriveIdentifier(o1) === this.getLogDownloadFileDriveIdentifier(o2) : o1 === o2;
  }

  addLogDownloadFileDriveToCollectionIfMissing<Type extends Pick<ILogDownloadFileDrive, 'id'>>(
    logDownloadFileDriveCollection: Type[],
    ...logDownloadFileDrivesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const logDownloadFileDrives: Type[] = logDownloadFileDrivesToCheck.filter(isPresent);
    if (logDownloadFileDrives.length > 0) {
      const logDownloadFileDriveCollectionIdentifiers = logDownloadFileDriveCollection.map(logDownloadFileDriveItem =>
        this.getLogDownloadFileDriveIdentifier(logDownloadFileDriveItem),
      );
      const logDownloadFileDrivesToAdd = logDownloadFileDrives.filter(logDownloadFileDriveItem => {
        const logDownloadFileDriveIdentifier = this.getLogDownloadFileDriveIdentifier(logDownloadFileDriveItem);
        if (logDownloadFileDriveCollectionIdentifiers.includes(logDownloadFileDriveIdentifier)) {
          return false;
        }
        logDownloadFileDriveCollectionIdentifiers.push(logDownloadFileDriveIdentifier);
        return true;
      });
      return [...logDownloadFileDrivesToAdd, ...logDownloadFileDriveCollection];
    }
    return logDownloadFileDriveCollection;
  }

  protected convertDateFromClient<T extends ILogDownloadFileDrive | NewLogDownloadFileDrive | PartialUpdateLogDownloadFileDrive>(
    logDownloadFileDrive: T,
  ): RestOf<T> {
    return {
      ...logDownloadFileDrive,
      ngayThaoTac: logDownloadFileDrive.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restLogDownloadFileDrive: RestLogDownloadFileDrive): ILogDownloadFileDrive {
    return {
      ...restLogDownloadFileDrive,
      ngayThaoTac: restLogDownloadFileDrive.ngayThaoTac ? dayjs(restLogDownloadFileDrive.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLogDownloadFileDrive>): HttpResponse<ILogDownloadFileDrive> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLogDownloadFileDrive[]>): HttpResponse<ILogDownloadFileDrive[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
