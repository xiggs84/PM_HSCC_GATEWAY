import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucDichVu } from '../danh-muc-dich-vu.model';
import { DanhMucDichVuService } from '../service/danh-muc-dich-vu.service';

const danhMucDichVuResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucDichVu> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucDichVuService)
      .find(id)
      .pipe(
        mergeMap((danhMucDichVu: HttpResponse<IDanhMucDichVu>) => {
          if (danhMucDichVu.body) {
            return of(danhMucDichVu.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucDichVuResolve;
