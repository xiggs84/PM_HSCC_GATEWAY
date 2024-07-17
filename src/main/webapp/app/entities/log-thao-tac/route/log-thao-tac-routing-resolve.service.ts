import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILogThaoTac } from '../log-thao-tac.model';
import { LogThaoTacService } from '../service/log-thao-tac.service';

const logThaoTacResolve = (route: ActivatedRouteSnapshot): Observable<null | ILogThaoTac> => {
  const id = route.params['id'];
  if (id) {
    return inject(LogThaoTacService)
      .find(id)
      .pipe(
        mergeMap((logThaoTac: HttpResponse<ILogThaoTac>) => {
          if (logThaoTac.body) {
            return of(logThaoTac.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default logThaoTacResolve;
