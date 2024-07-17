import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhsachDsNganchanTmp } from '../danhsach-ds-nganchan-tmp.model';
import { DanhsachDsNganchanTmpService } from '../service/danhsach-ds-nganchan-tmp.service';

const danhsachDsNganchanTmpResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhsachDsNganchanTmp> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhsachDsNganchanTmpService)
      .find(id)
      .pipe(
        mergeMap((danhsachDsNganchanTmp: HttpResponse<IDanhsachDsNganchanTmp>) => {
          if (danhsachDsNganchanTmp.body) {
            return of(danhsachDsNganchanTmp.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhsachDsNganchanTmpResolve;
