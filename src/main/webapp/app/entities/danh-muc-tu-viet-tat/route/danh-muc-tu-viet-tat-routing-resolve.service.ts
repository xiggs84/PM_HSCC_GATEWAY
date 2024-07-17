import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucTuVietTat } from '../danh-muc-tu-viet-tat.model';
import { DanhMucTuVietTatService } from '../service/danh-muc-tu-viet-tat.service';

const danhMucTuVietTatResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucTuVietTat> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucTuVietTatService)
      .find(id)
      .pipe(
        mergeMap((danhMucTuVietTat: HttpResponse<IDanhMucTuVietTat>) => {
          if (danhMucTuVietTat.body) {
            return of(danhMucTuVietTat.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucTuVietTatResolve;
