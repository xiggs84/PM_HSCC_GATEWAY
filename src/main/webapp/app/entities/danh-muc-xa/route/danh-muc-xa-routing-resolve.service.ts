import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucXa } from '../danh-muc-xa.model';
import { DanhMucXaService } from '../service/danh-muc-xa.service';

const danhMucXaResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucXa> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucXaService)
      .find(id)
      .pipe(
        mergeMap((danhMucXa: HttpResponse<IDanhMucXa>) => {
          if (danhMucXa.body) {
            return of(danhMucXa.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucXaResolve;
