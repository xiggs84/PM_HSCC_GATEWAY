import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICauHinhThongTinDuongSu } from '../cau-hinh-thong-tin-duong-su.model';
import { CauHinhThongTinDuongSuService } from '../service/cau-hinh-thong-tin-duong-su.service';

const cauHinhThongTinDuongSuResolve = (route: ActivatedRouteSnapshot): Observable<null | ICauHinhThongTinDuongSu> => {
  const id = route.params['id'];
  if (id) {
    return inject(CauHinhThongTinDuongSuService)
      .find(id)
      .pipe(
        mergeMap((cauHinhThongTinDuongSu: HttpResponse<ICauHinhThongTinDuongSu>) => {
          if (cauHinhThongTinDuongSu.body) {
            return of(cauHinhThongTinDuongSu.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default cauHinhThongTinDuongSuResolve;
