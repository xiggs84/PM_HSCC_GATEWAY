import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDuongSu } from '../duong-su.model';
import { DuongSuService } from '../service/duong-su.service';

const duongSuResolve = (route: ActivatedRouteSnapshot): Observable<null | IDuongSu> => {
  const id = route.params['id'];
  if (id) {
    return inject(DuongSuService)
      .find(id)
      .pipe(
        mergeMap((duongSu: HttpResponse<IDuongSu>) => {
          if (duongSu.body) {
            return of(duongSu.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default duongSuResolve;
