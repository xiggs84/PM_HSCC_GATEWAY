import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChiTietNganChan } from '../chi-tiet-ngan-chan.model';
import { ChiTietNganChanService } from '../service/chi-tiet-ngan-chan.service';

const chiTietNganChanResolve = (route: ActivatedRouteSnapshot): Observable<null | IChiTietNganChan> => {
  const id = route.params['id'];
  if (id) {
    return inject(ChiTietNganChanService)
      .find(id)
      .pipe(
        mergeMap((chiTietNganChan: HttpResponse<IChiTietNganChan>) => {
          if (chiTietNganChan.body) {
            return of(chiTietNganChan.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default chiTietNganChanResolve;
