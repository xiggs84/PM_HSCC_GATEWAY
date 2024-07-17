import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhSachDuongSu } from '../danh-sach-duong-su.model';
import { DanhSachDuongSuService } from '../service/danh-sach-duong-su.service';

const danhSachDuongSuResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhSachDuongSu> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhSachDuongSuService)
      .find(id)
      .pipe(
        mergeMap((danhSachDuongSu: HttpResponse<IDanhSachDuongSu>) => {
          if (danhSachDuongSu.body) {
            return of(danhSachDuongSu.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhSachDuongSuResolve;
