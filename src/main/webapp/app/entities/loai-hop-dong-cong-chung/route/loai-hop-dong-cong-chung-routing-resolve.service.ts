import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILoaiHopDongCongChung } from '../loai-hop-dong-cong-chung.model';
import { LoaiHopDongCongChungService } from '../service/loai-hop-dong-cong-chung.service';

const loaiHopDongCongChungResolve = (route: ActivatedRouteSnapshot): Observable<null | ILoaiHopDongCongChung> => {
  const id = route.params['id'];
  if (id) {
    return inject(LoaiHopDongCongChungService)
      .find(id)
      .pipe(
        mergeMap((loaiHopDongCongChung: HttpResponse<ILoaiHopDongCongChung>) => {
          if (loaiHopDongCongChung.body) {
            return of(loaiHopDongCongChung.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default loaiHopDongCongChungResolve;
