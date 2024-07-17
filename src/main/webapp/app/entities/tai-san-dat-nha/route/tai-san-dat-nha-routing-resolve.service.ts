import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaiSanDatNha } from '../tai-san-dat-nha.model';
import { TaiSanDatNhaService } from '../service/tai-san-dat-nha.service';

const taiSanDatNhaResolve = (route: ActivatedRouteSnapshot): Observable<null | ITaiSanDatNha> => {
  const id = route.params['id'];
  if (id) {
    return inject(TaiSanDatNhaService)
      .find(id)
      .pipe(
        mergeMap((taiSanDatNha: HttpResponse<ITaiSanDatNha>) => {
          if (taiSanDatNha.body) {
            return of(taiSanDatNha.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default taiSanDatNhaResolve;
