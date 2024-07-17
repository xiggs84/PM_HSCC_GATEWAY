import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuanHeMaster } from '../quan-he-master.model';
import { QuanHeMasterService } from '../service/quan-he-master.service';

const quanHeMasterResolve = (route: ActivatedRouteSnapshot): Observable<null | IQuanHeMaster> => {
  const id = route.params['id'];
  if (id) {
    return inject(QuanHeMasterService)
      .find(id)
      .pipe(
        mergeMap((quanHeMaster: HttpResponse<IQuanHeMaster>) => {
          if (quanHeMaster.body) {
            return of(quanHeMaster.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default quanHeMasterResolve;
