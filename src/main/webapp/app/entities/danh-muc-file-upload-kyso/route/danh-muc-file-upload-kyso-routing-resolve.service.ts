import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucFileUploadKyso } from '../danh-muc-file-upload-kyso.model';
import { DanhMucFileUploadKysoService } from '../service/danh-muc-file-upload-kyso.service';

const danhMucFileUploadKysoResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucFileUploadKyso> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucFileUploadKysoService)
      .find(id)
      .pipe(
        mergeMap((danhMucFileUploadKyso: HttpResponse<IDanhMucFileUploadKyso>) => {
          if (danhMucFileUploadKyso.body) {
            return of(danhMucFileUploadKyso.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucFileUploadKysoResolve;
