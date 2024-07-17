import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaisanSaiDgc } from '../taisan-sai-dgc.model';
import { TaisanSaiDgcService } from '../service/taisan-sai-dgc.service';

const taisanSaiDgcResolve = (route: ActivatedRouteSnapshot): Observable<null | ITaisanSaiDgc> => {
  const id = route.params['id'];
  if (id) {
    return inject(TaisanSaiDgcService)
      .find(id)
      .pipe(
        mergeMap((taisanSaiDgc: HttpResponse<ITaisanSaiDgc>) => {
          if (taisanSaiDgc.body) {
            return of(taisanSaiDgc.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default taisanSaiDgcResolve;
