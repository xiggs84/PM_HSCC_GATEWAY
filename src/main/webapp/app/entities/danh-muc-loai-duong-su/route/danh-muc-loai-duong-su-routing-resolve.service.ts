import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucLoaiDuongSu } from '../danh-muc-loai-duong-su.model';
import { DanhMucLoaiDuongSuService } from '../service/danh-muc-loai-duong-su.service';

const danhMucLoaiDuongSuResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucLoaiDuongSu> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucLoaiDuongSuService)
      .find(id)
      .pipe(
        mergeMap((danhMucLoaiDuongSu: HttpResponse<IDanhMucLoaiDuongSu>) => {
          if (danhMucLoaiDuongSu.body) {
            return of(danhMucLoaiDuongSu.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucLoaiDuongSuResolve;
