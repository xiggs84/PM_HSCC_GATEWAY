import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuyen } from '../quyen.model';
import { QuyenService } from '../service/quyen.service';

const quyenResolve = (route: ActivatedRouteSnapshot): Observable<null | IQuyen> => {
  const id = route.params['id'];
  if (id) {
    return inject(QuyenService)
      .find(id)
      .pipe(
        mergeMap((quyen: HttpResponse<IQuyen>) => {
          if (quyen.body) {
            return of(quyen.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default quyenResolve;
