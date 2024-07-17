import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INoiCapGttt } from '../noi-cap-gttt.model';
import { NoiCapGtttService } from '../service/noi-cap-gttt.service';

const noiCapGtttResolve = (route: ActivatedRouteSnapshot): Observable<null | INoiCapGttt> => {
  const id = route.params['id'];
  if (id) {
    return inject(NoiCapGtttService)
      .find(id)
      .pipe(
        mergeMap((noiCapGttt: HttpResponse<INoiCapGttt>) => {
          if (noiCapGttt.body) {
            return of(noiCapGttt.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default noiCapGtttResolve;
