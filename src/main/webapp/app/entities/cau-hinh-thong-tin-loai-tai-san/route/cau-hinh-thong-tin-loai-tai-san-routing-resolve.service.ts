import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICauHinhThongTinLoaiTaiSan } from '../cau-hinh-thong-tin-loai-tai-san.model';
import { CauHinhThongTinLoaiTaiSanService } from '../service/cau-hinh-thong-tin-loai-tai-san.service';

const cauHinhThongTinLoaiTaiSanResolve = (route: ActivatedRouteSnapshot): Observable<null | ICauHinhThongTinLoaiTaiSan> => {
  const id = route.params['id'];
  if (id) {
    return inject(CauHinhThongTinLoaiTaiSanService)
      .find(id)
      .pipe(
        mergeMap((cauHinhThongTinLoaiTaiSan: HttpResponse<ICauHinhThongTinLoaiTaiSan>) => {
          if (cauHinhThongTinLoaiTaiSan.body) {
            return of(cauHinhThongTinLoaiTaiSan.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default cauHinhThongTinLoaiTaiSanResolve;
