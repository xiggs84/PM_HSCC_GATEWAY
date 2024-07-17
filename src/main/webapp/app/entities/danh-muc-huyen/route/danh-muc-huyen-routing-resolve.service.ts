import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucHuyen } from '../danh-muc-huyen.model';
import { DanhMucHuyenService } from '../service/danh-muc-huyen.service';

const danhMucHuyenResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucHuyen> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucHuyenService)
      .find(id)
      .pipe(
        mergeMap((danhMucHuyen: HttpResponse<IDanhMucHuyen>) => {
          if (danhMucHuyen.body) {
            return of(danhMucHuyen.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucHuyenResolve;
