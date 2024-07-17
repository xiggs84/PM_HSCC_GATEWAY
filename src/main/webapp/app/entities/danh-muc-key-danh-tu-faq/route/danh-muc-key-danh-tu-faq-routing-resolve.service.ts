import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucKeyDanhTuFaq } from '../danh-muc-key-danh-tu-faq.model';
import { DanhMucKeyDanhTuFaqService } from '../service/danh-muc-key-danh-tu-faq.service';

const danhMucKeyDanhTuFaqResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucKeyDanhTuFaq> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucKeyDanhTuFaqService)
      .find(id)
      .pipe(
        mergeMap((danhMucKeyDanhTuFaq: HttpResponse<IDanhMucKeyDanhTuFaq>) => {
          if (danhMucKeyDanhTuFaq.body) {
            return of(danhMucKeyDanhTuFaq.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucKeyDanhTuFaqResolve;
