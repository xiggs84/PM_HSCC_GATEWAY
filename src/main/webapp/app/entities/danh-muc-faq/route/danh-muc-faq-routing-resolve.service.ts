import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucFaq } from '../danh-muc-faq.model';
import { DanhMucFaqService } from '../service/danh-muc-faq.service';

const danhMucFaqResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucFaq> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucFaqService)
      .find(id)
      .pipe(
        mergeMap((danhMucFaq: HttpResponse<IDanhMucFaq>) => {
          if (danhMucFaq.body) {
            return of(danhMucFaq.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucFaqResolve;
