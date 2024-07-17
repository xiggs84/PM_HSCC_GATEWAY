import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILogDownloadFileDrive } from '../log-download-file-drive.model';
import { LogDownloadFileDriveService } from '../service/log-download-file-drive.service';

const logDownloadFileDriveResolve = (route: ActivatedRouteSnapshot): Observable<null | ILogDownloadFileDrive> => {
  const id = route.params['id'];
  if (id) {
    return inject(LogDownloadFileDriveService)
      .find(id)
      .pipe(
        mergeMap((logDownloadFileDrive: HttpResponse<ILogDownloadFileDrive>) => {
          if (logDownloadFileDrive.body) {
            return of(logDownloadFileDrive.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default logDownloadFileDriveResolve;
