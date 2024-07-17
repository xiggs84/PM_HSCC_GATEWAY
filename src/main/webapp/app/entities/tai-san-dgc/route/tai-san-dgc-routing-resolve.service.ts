import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaiSanDgc } from '../tai-san-dgc.model';
import { TaiSanDgcService } from '../service/tai-san-dgc.service';

const taiSanDgcResolve = (route: ActivatedRouteSnapshot): Observable<null | ITaiSanDgc> => {
  const id = route.params['id'];
  if (id) {
    return inject(TaiSanDgcService)
      .find(id)
      .pipe(
        mergeMap((taiSanDgc: HttpResponse<ITaiSanDgc>) => {
          if (taiSanDgc.body) {
            return of(taiSanDgc.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default taiSanDgcResolve;
