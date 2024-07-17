import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILogLienThongMotCua } from '../log-lien-thong-mot-cua.model';
import { LogLienThongMotCuaService } from '../service/log-lien-thong-mot-cua.service';

const logLienThongMotCuaResolve = (route: ActivatedRouteSnapshot): Observable<null | ILogLienThongMotCua> => {
  const id = route.params['id'];
  if (id) {
    return inject(LogLienThongMotCuaService)
      .find(id)
      .pipe(
        mergeMap((logLienThongMotCua: HttpResponse<ILogLienThongMotCua>) => {
          if (logLienThongMotCua.body) {
            return of(logLienThongMotCua.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default logLienThongMotCuaResolve;
