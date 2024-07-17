import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHdMasterTcCoCcv } from '../hd-master-tc-co-ccv.model';
import { HdMasterTcCoCcvService } from '../service/hd-master-tc-co-ccv.service';

const hdMasterTcCoCcvResolve = (route: ActivatedRouteSnapshot): Observable<null | IHdMasterTcCoCcv> => {
  const id = route.params['id'];
  if (id) {
    return inject(HdMasterTcCoCcvService)
      .find(id)
      .pipe(
        mergeMap((hdMasterTcCoCcv: HttpResponse<IHdMasterTcCoCcv>) => {
          if (hdMasterTcCoCcv.body) {
            return of(hdMasterTcCoCcv.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default hdMasterTcCoCcvResolve;
