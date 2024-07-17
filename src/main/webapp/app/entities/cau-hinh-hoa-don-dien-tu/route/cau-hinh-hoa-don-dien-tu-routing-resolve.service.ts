import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICauHinhHoaDonDienTu } from '../cau-hinh-hoa-don-dien-tu.model';
import { CauHinhHoaDonDienTuService } from '../service/cau-hinh-hoa-don-dien-tu.service';

const cauHinhHoaDonDienTuResolve = (route: ActivatedRouteSnapshot): Observable<null | ICauHinhHoaDonDienTu> => {
  const id = route.params['id'];
  if (id) {
    return inject(CauHinhHoaDonDienTuService)
      .find(id)
      .pipe(
        mergeMap((cauHinhHoaDonDienTu: HttpResponse<ICauHinhHoaDonDienTu>) => {
          if (cauHinhHoaDonDienTu.body) {
            return of(cauHinhHoaDonDienTu.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default cauHinhHoaDonDienTuResolve;
