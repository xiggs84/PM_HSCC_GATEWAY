import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuanHeNhanThan } from '../quan-he-nhan-than.model';
import { QuanHeNhanThanService } from '../service/quan-he-nhan-than.service';

const quanHeNhanThanResolve = (route: ActivatedRouteSnapshot): Observable<null | IQuanHeNhanThan> => {
  const id = route.params['id'];
  if (id) {
    return inject(QuanHeNhanThanService)
      .find(id)
      .pipe(
        mergeMap((quanHeNhanThan: HttpResponse<IQuanHeNhanThan>) => {
          if (quanHeNhanThan.body) {
            return of(quanHeNhanThan.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default quanHeNhanThanResolve;
