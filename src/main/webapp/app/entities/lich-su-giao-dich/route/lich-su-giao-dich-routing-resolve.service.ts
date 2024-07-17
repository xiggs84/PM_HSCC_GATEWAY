import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILichSuGiaoDich } from '../lich-su-giao-dich.model';
import { LichSuGiaoDichService } from '../service/lich-su-giao-dich.service';

const lichSuGiaoDichResolve = (route: ActivatedRouteSnapshot): Observable<null | ILichSuGiaoDich> => {
  const id = route.params['id'];
  if (id) {
    return inject(LichSuGiaoDichService)
      .find(id)
      .pipe(
        mergeMap((lichSuGiaoDich: HttpResponse<ILichSuGiaoDich>) => {
          if (lichSuGiaoDich.body) {
            return of(lichSuGiaoDich.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default lichSuGiaoDichResolve;
