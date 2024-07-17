import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucTinhTrangHonNhan } from '../danh-muc-tinh-trang-hon-nhan.model';
import { DanhMucTinhTrangHonNhanService } from '../service/danh-muc-tinh-trang-hon-nhan.service';

const danhMucTinhTrangHonNhanResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucTinhTrangHonNhan> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucTinhTrangHonNhanService)
      .find(id)
      .pipe(
        mergeMap((danhMucTinhTrangHonNhan: HttpResponse<IDanhMucTinhTrangHonNhan>) => {
          if (danhMucTinhTrangHonNhan.body) {
            return of(danhMucTinhTrangHonNhan.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucTinhTrangHonNhanResolve;
