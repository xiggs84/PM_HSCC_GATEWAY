import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucNgonNgu } from '../danh-muc-ngon-ngu.model';
import { DanhMucNgonNguService } from '../service/danh-muc-ngon-ngu.service';

const danhMucNgonNguResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucNgonNgu> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucNgonNguService)
      .find(id)
      .pipe(
        mergeMap((danhMucNgonNgu: HttpResponse<IDanhMucNgonNgu>) => {
          if (danhMucNgonNgu.body) {
            return of(danhMucNgonNgu.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucNgonNguResolve;
