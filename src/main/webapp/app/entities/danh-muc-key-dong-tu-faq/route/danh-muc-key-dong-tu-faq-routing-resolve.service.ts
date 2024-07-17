import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucKeyDongTuFaq } from '../danh-muc-key-dong-tu-faq.model';
import { DanhMucKeyDongTuFaqService } from '../service/danh-muc-key-dong-tu-faq.service';

const danhMucKeyDongTuFaqResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucKeyDongTuFaq> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucKeyDongTuFaqService)
      .find(id)
      .pipe(
        mergeMap((danhMucKeyDongTuFaq: HttpResponse<IDanhMucKeyDongTuFaq>) => {
          if (danhMucKeyDongTuFaq.body) {
            return of(danhMucKeyDongTuFaq.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucKeyDongTuFaqResolve;
