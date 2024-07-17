import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucQuocGia } from '../danh-muc-quoc-gia.model';
import { DanhMucQuocGiaService } from '../service/danh-muc-quoc-gia.service';

const danhMucQuocGiaResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucQuocGia> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucQuocGiaService)
      .find(id)
      .pipe(
        mergeMap((danhMucQuocGia: HttpResponse<IDanhMucQuocGia>) => {
          if (danhMucQuocGia.body) {
            return of(danhMucQuocGia.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucQuocGiaResolve;
