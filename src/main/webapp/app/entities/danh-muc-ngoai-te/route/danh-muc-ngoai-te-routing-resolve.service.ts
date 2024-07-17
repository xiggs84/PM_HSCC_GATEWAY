import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucNgoaiTe } from '../danh-muc-ngoai-te.model';
import { DanhMucNgoaiTeService } from '../service/danh-muc-ngoai-te.service';

const danhMucNgoaiTeResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucNgoaiTe> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucNgoaiTeService)
      .find(id)
      .pipe(
        mergeMap((danhMucNgoaiTe: HttpResponse<IDanhMucNgoaiTe>) => {
          if (danhMucNgoaiTe.body) {
            return of(danhMucNgoaiTe.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucNgoaiTeResolve;
