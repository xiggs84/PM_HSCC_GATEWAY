import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhSachTaiSan } from '../danh-sach-tai-san.model';
import { DanhSachTaiSanService } from '../service/danh-sach-tai-san.service';

const danhSachTaiSanResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhSachTaiSan> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhSachTaiSanService)
      .find(id)
      .pipe(
        mergeMap((danhSachTaiSan: HttpResponse<IDanhSachTaiSan>) => {
          if (danhSachTaiSan.body) {
            return of(danhSachTaiSan.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhSachTaiSanResolve;
