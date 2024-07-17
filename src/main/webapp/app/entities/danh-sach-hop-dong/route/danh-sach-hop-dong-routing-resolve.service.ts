import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhSachHopDong } from '../danh-sach-hop-dong.model';
import { DanhSachHopDongService } from '../service/danh-sach-hop-dong.service';

const danhSachHopDongResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhSachHopDong> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhSachHopDongService)
      .find(id)
      .pipe(
        mergeMap((danhSachHopDong: HttpResponse<IDanhSachHopDong>) => {
          if (danhSachHopDong.body) {
            return of(danhSachHopDong.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhSachHopDongResolve;
