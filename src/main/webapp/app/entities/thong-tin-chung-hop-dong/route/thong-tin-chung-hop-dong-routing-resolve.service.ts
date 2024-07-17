import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IThongTinChungHopDong } from '../thong-tin-chung-hop-dong.model';
import { ThongTinChungHopDongService } from '../service/thong-tin-chung-hop-dong.service';

const thongTinChungHopDongResolve = (route: ActivatedRouteSnapshot): Observable<null | IThongTinChungHopDong> => {
  const id = route.params['id'];
  if (id) {
    return inject(ThongTinChungHopDongService)
      .find(id)
      .pipe(
        mergeMap((thongTinChungHopDong: HttpResponse<IThongTinChungHopDong>) => {
          if (thongTinChungHopDong.body) {
            return of(thongTinChungHopDong.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default thongTinChungHopDongResolve;
