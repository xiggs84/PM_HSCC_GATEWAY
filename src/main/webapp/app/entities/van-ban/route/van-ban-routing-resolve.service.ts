import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVanBan } from '../van-ban.model';
import { VanBanService } from '../service/van-ban.service';

const vanBanResolve = (route: ActivatedRouteSnapshot): Observable<null | IVanBan> => {
  const id = route.params['id'];
  if (id) {
    return inject(VanBanService)
      .find(id)
      .pipe(
        mergeMap((vanBan: HttpResponse<IVanBan>) => {
          if (vanBan.body) {
            return of(vanBan.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default vanBanResolve;
