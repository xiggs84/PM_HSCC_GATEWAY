import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITinhTrangDuongSu } from '../tinh-trang-duong-su.model';
import { TinhTrangDuongSuService } from '../service/tinh-trang-duong-su.service';

const tinhTrangDuongSuResolve = (route: ActivatedRouteSnapshot): Observable<null | ITinhTrangDuongSu> => {
  const id = route.params['id'];
  if (id) {
    return inject(TinhTrangDuongSuService)
      .find(id)
      .pipe(
        mergeMap((tinhTrangDuongSu: HttpResponse<ITinhTrangDuongSu>) => {
          if (tinhTrangDuongSu.body) {
            return of(tinhTrangDuongSu.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tinhTrangDuongSuResolve;
