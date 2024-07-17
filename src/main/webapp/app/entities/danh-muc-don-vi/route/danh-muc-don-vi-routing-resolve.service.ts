import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucDonVi } from '../danh-muc-don-vi.model';
import { DanhMucDonViService } from '../service/danh-muc-don-vi.service';

const danhMucDonViResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucDonVi> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucDonViService)
      .find(id)
      .pipe(
        mergeMap((danhMucDonVi: HttpResponse<IDanhMucDonVi>) => {
          if (danhMucDonVi.body) {
            return of(danhMucDonVi.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucDonViResolve;
