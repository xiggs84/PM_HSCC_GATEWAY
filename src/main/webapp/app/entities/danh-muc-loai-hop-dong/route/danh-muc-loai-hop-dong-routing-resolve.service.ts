import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucLoaiHopDong } from '../danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from '../service/danh-muc-loai-hop-dong.service';

const danhMucLoaiHopDongResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucLoaiHopDong> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucLoaiHopDongService)
      .find(id)
      .pipe(
        mergeMap((danhMucLoaiHopDong: HttpResponse<IDanhMucLoaiHopDong>) => {
          if (danhMucLoaiHopDong.body) {
            return of(danhMucLoaiHopDong.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucLoaiHopDongResolve;
