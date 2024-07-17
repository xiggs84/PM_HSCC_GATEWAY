import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDuongSuTrungCmnd } from '../duong-su-trung-cmnd.model';
import { DuongSuTrungCmndService } from '../service/duong-su-trung-cmnd.service';

const duongSuTrungCmndResolve = (route: ActivatedRouteSnapshot): Observable<null | IDuongSuTrungCmnd> => {
  const id = route.params['id'];
  if (id) {
    return inject(DuongSuTrungCmndService)
      .find(id)
      .pipe(
        mergeMap((duongSuTrungCmnd: HttpResponse<IDuongSuTrungCmnd>) => {
          if (duongSuTrungCmnd.body) {
            return of(duongSuTrungCmnd.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default duongSuTrungCmndResolve;
