import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHopDongCongChung } from '../hop-dong-cong-chung.model';
import { HopDongCongChungService } from '../service/hop-dong-cong-chung.service';

const hopDongCongChungResolve = (route: ActivatedRouteSnapshot): Observable<null | IHopDongCongChung> => {
  const id = route.params['id'];
  if (id) {
    return inject(HopDongCongChungService)
      .find(id)
      .pipe(
        mergeMap((hopDongCongChung: HttpResponse<IHopDongCongChung>) => {
          if (hopDongCongChung.body) {
            return of(hopDongCongChung.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default hopDongCongChungResolve;
