import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICanBoQuyen } from '../can-bo-quyen.model';
import { CanBoQuyenService } from '../service/can-bo-quyen.service';

const canBoQuyenResolve = (route: ActivatedRouteSnapshot): Observable<null | ICanBoQuyen> => {
  const id = route.params['id'];
  if (id) {
    return inject(CanBoQuyenService)
      .find(id)
      .pipe(
        mergeMap((canBoQuyen: HttpResponse<ICanBoQuyen>) => {
          if (canBoQuyen.body) {
            return of(canBoQuyen.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default canBoQuyenResolve;
