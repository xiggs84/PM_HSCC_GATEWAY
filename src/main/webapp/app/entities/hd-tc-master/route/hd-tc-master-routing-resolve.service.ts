import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHdTcMaster } from '../hd-tc-master.model';
import { HdTcMasterService } from '../service/hd-tc-master.service';

const hdTcMasterResolve = (route: ActivatedRouteSnapshot): Observable<null | IHdTcMaster> => {
  const id = route.params['id'];
  if (id) {
    return inject(HdTcMasterService)
      .find(id)
      .pipe(
        mergeMap((hdTcMaster: HttpResponse<IHdTcMaster>) => {
          if (hdTcMaster.body) {
            return of(hdTcMaster.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default hdTcMasterResolve;
