import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISoCongChung } from '../so-cong-chung.model';
import { SoCongChungService } from '../service/so-cong-chung.service';

const soCongChungResolve = (route: ActivatedRouteSnapshot): Observable<null | ISoCongChung> => {
  const id = route.params['id'];
  if (id) {
    return inject(SoCongChungService)
      .find(id)
      .pipe(
        mergeMap((soCongChung: HttpResponse<ISoCongChung>) => {
          if (soCongChung.body) {
            return of(soCongChung.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default soCongChungResolve;
