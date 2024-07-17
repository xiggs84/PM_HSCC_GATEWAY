import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaiSanDuongSu } from '../tai-san-duong-su.model';
import { TaiSanDuongSuService } from '../service/tai-san-duong-su.service';

const taiSanDuongSuResolve = (route: ActivatedRouteSnapshot): Observable<null | ITaiSanDuongSu> => {
  const id = route.params['id'];
  if (id) {
    return inject(TaiSanDuongSuService)
      .find(id)
      .pipe(
        mergeMap((taiSanDuongSu: HttpResponse<ITaiSanDuongSu>) => {
          if (taiSanDuongSu.body) {
            return of(taiSanDuongSu.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default taiSanDuongSuResolve;
