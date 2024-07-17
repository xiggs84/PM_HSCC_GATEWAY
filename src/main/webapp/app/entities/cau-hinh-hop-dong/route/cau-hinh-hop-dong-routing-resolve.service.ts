import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICauHinhHopDong } from '../cau-hinh-hop-dong.model';
import { CauHinhHopDongService } from '../service/cau-hinh-hop-dong.service';

const cauHinhHopDongResolve = (route: ActivatedRouteSnapshot): Observable<null | ICauHinhHopDong> => {
  const id = route.params['id'];
  if (id) {
    return inject(CauHinhHopDongService)
      .find(id)
      .pipe(
        mergeMap((cauHinhHopDong: HttpResponse<ICauHinhHopDong>) => {
          if (cauHinhHopDong.body) {
            return of(cauHinhHopDong.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default cauHinhHopDongResolve;
