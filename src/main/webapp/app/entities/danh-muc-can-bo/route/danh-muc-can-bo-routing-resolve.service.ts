import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucCanBo } from '../danh-muc-can-bo.model';
import { DanhMucCanBoService } from '../service/danh-muc-can-bo.service';

const danhMucCanBoResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucCanBo> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucCanBoService)
      .find(id)
      .pipe(
        mergeMap((danhMucCanBo: HttpResponse<IDanhMucCanBo>) => {
          if (danhMucCanBo.body) {
            return of(danhMucCanBo.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucCanBoResolve;
