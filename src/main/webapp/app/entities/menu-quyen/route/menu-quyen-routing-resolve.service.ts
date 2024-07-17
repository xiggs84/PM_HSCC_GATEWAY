import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMenuQuyen } from '../menu-quyen.model';
import { MenuQuyenService } from '../service/menu-quyen.service';

const menuQuyenResolve = (route: ActivatedRouteSnapshot): Observable<null | IMenuQuyen> => {
  const id = route.params['id'];
  if (id) {
    return inject(MenuQuyenService)
      .find(id)
      .pipe(
        mergeMap((menuQuyen: HttpResponse<IMenuQuyen>) => {
          if (menuQuyen.body) {
            return of(menuQuyen.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default menuQuyenResolve;
