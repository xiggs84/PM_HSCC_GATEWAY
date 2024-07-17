import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISoLanHoiFaq } from '../so-lan-hoi-faq.model';
import { SoLanHoiFaqService } from '../service/so-lan-hoi-faq.service';

const soLanHoiFaqResolve = (route: ActivatedRouteSnapshot): Observable<null | ISoLanHoiFaq> => {
  const id = route.params['id'];
  if (id) {
    return inject(SoLanHoiFaqService)
      .find(id)
      .pipe(
        mergeMap((soLanHoiFaq: HttpResponse<ISoLanHoiFaq>) => {
          if (soLanHoiFaq.body) {
            return of(soLanHoiFaq.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default soLanHoiFaqResolve;
