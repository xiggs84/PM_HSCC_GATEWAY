import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILogDangNhap } from '../log-dang-nhap.model';
import { LogDangNhapService } from '../service/log-dang-nhap.service';

const logDangNhapResolve = (route: ActivatedRouteSnapshot): Observable<null | ILogDangNhap> => {
  const id = route.params['id'];
  if (id) {
    return inject(LogDangNhapService)
      .find(id)
      .pipe(
        mergeMap((logDangNhap: HttpResponse<ILogDangNhap>) => {
          if (logDangNhap.body) {
            return of(logDangNhap.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default logDangNhapResolve;
