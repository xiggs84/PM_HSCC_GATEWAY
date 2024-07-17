import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILogHoaDonDienTu } from '../log-hoa-don-dien-tu.model';
import { LogHoaDonDienTuService } from '../service/log-hoa-don-dien-tu.service';

const logHoaDonDienTuResolve = (route: ActivatedRouteSnapshot): Observable<null | ILogHoaDonDienTu> => {
  const id = route.params['id'];
  if (id) {
    return inject(LogHoaDonDienTuService)
      .find(id)
      .pipe(
        mergeMap((logHoaDonDienTu: HttpResponse<ILogHoaDonDienTu>) => {
          if (logHoaDonDienTu.body) {
            return of(logHoaDonDienTu.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default logHoaDonDienTuResolve;
