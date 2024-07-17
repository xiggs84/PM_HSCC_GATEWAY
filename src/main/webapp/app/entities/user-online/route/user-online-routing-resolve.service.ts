import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUserOnline } from '../user-online.model';
import { UserOnlineService } from '../service/user-online.service';

const userOnlineResolve = (route: ActivatedRouteSnapshot): Observable<null | IUserOnline> => {
  const id = route.params['id'];
  if (id) {
    return inject(UserOnlineService)
      .find(id)
      .pipe(
        mergeMap((userOnline: HttpResponse<IUserOnline>) => {
          if (userOnline.body) {
            return of(userOnline.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default userOnlineResolve;
