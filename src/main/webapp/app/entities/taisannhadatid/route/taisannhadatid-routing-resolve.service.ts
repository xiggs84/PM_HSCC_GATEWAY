import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaisannhadatid } from '../taisannhadatid.model';
import { TaisannhadatidService } from '../service/taisannhadatid.service';

const taisannhadatidResolve = (route: ActivatedRouteSnapshot): Observable<null | ITaisannhadatid> => {
  const id = route.params['id'];
  if (id) {
    return inject(TaisannhadatidService)
      .find(id)
      .pipe(
        mergeMap((taisannhadatid: HttpResponse<ITaisannhadatid>) => {
          if (taisannhadatid.body) {
            return of(taisannhadatid.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default taisannhadatidResolve;
