import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucLoaiGiayTo } from '../danh-muc-loai-giay-to.model';
import { DanhMucLoaiGiayToService } from '../service/danh-muc-loai-giay-to.service';

const danhMucLoaiGiayToResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucLoaiGiayTo> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucLoaiGiayToService)
      .find(id)
      .pipe(
        mergeMap((danhMucLoaiGiayTo: HttpResponse<IDanhMucLoaiGiayTo>) => {
          if (danhMucLoaiGiayTo.body) {
            return of(danhMucLoaiGiayTo.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucLoaiGiayToResolve;
