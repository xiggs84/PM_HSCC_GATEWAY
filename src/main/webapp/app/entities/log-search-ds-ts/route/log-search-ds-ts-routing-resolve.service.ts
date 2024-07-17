import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILogSearchDsTs } from '../log-search-ds-ts.model';
import { LogSearchDsTsService } from '../service/log-search-ds-ts.service';

const logSearchDsTsResolve = (route: ActivatedRouteSnapshot): Observable<null | ILogSearchDsTs> => {
  const id = route.params['id'];
  if (id) {
    return inject(LogSearchDsTsService)
      .find(id)
      .pipe(
        mergeMap((logSearchDsTs: HttpResponse<ILogSearchDsTs>) => {
          if (logSearchDsTs.body) {
            return of(logSearchDsTs.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default logSearchDsTsResolve;
