import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISoHuuTheo } from '../so-huu-theo.model';
import { SoHuuTheoService } from '../service/so-huu-theo.service';

const soHuuTheoResolve = (route: ActivatedRouteSnapshot): Observable<null | ISoHuuTheo> => {
  const id = route.params['id'];
  if (id) {
    return inject(SoHuuTheoService)
      .find(id)
      .pipe(
        mergeMap((soHuuTheo: HttpResponse<ISoHuuTheo>) => {
          if (soHuuTheo.body) {
            return of(soHuuTheo.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default soHuuTheoResolve;
