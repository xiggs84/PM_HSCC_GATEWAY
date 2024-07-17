import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHdMasterCoCcv } from '../hd-master-co-ccv.model';
import { HdMasterCoCcvService } from '../service/hd-master-co-ccv.service';

const hdMasterCoCcvResolve = (route: ActivatedRouteSnapshot): Observable<null | IHdMasterCoCcv> => {
  const id = route.params['id'];
  if (id) {
    return inject(HdMasterCoCcvService)
      .find(id)
      .pipe(
        mergeMap((hdMasterCoCcv: HttpResponse<IHdMasterCoCcv>) => {
          if (hdMasterCoCcv.body) {
            return of(hdMasterCoCcv.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default hdMasterCoCcvResolve;
