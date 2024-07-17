import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFileidDrive } from '../fileid-drive.model';
import { FileidDriveService } from '../service/fileid-drive.service';

const fileidDriveResolve = (route: ActivatedRouteSnapshot): Observable<null | IFileidDrive> => {
  const id = route.params['id'];
  if (id) {
    return inject(FileidDriveService)
      .find(id)
      .pipe(
        mergeMap((fileidDrive: HttpResponse<IFileidDrive>) => {
          if (fileidDrive.body) {
            return of(fileidDrive.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default fileidDriveResolve;
