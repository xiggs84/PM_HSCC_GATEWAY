import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucNoiCapQsh } from '../danh-muc-noi-cap-qsh.model';
import { DanhMucNoiCapQshService } from '../service/danh-muc-noi-cap-qsh.service';

const danhMucNoiCapQshResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucNoiCapQsh> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucNoiCapQshService)
      .find(id)
      .pipe(
        mergeMap((danhMucNoiCapQsh: HttpResponse<IDanhMucNoiCapQsh>) => {
          if (danhMucNoiCapQsh.body) {
            return of(danhMucNoiCapQsh.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucNoiCapQshResolve;
