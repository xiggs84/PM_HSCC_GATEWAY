import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPhanLoaiHopDong } from '../phan-loai-hop-dong.model';
import { PhanLoaiHopDongService } from '../service/phan-loai-hop-dong.service';

const phanLoaiHopDongResolve = (route: ActivatedRouteSnapshot): Observable<null | IPhanLoaiHopDong> => {
  const id = route.params['id'];
  if (id) {
    return inject(PhanLoaiHopDongService)
      .find(id)
      .pipe(
        mergeMap((phanLoaiHopDong: HttpResponse<IPhanLoaiHopDong>) => {
          if (phanLoaiHopDong.body) {
            return of(phanLoaiHopDong.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default phanLoaiHopDongResolve;
