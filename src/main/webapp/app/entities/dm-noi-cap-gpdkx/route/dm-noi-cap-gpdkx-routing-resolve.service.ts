import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDmNoiCapGpdkx } from '../dm-noi-cap-gpdkx.model';
import { DmNoiCapGpdkxService } from '../service/dm-noi-cap-gpdkx.service';

const dmNoiCapGpdkxResolve = (route: ActivatedRouteSnapshot): Observable<null | IDmNoiCapGpdkx> => {
  const id = route.params['id'];
  if (id) {
    return inject(DmNoiCapGpdkxService)
      .find(id)
      .pipe(
        mergeMap((dmNoiCapGpdkx: HttpResponse<IDmNoiCapGpdkx>) => {
          if (dmNoiCapGpdkx.body) {
            return of(dmNoiCapGpdkx.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default dmNoiCapGpdkxResolve;
