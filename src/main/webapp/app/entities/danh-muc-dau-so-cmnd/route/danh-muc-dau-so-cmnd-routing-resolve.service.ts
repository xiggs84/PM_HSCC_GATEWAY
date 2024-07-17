import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucDauSoCmnd } from '../danh-muc-dau-so-cmnd.model';
import { DanhMucDauSoCmndService } from '../service/danh-muc-dau-so-cmnd.service';

const danhMucDauSoCmndResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucDauSoCmnd> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucDauSoCmndService)
      .find(id)
      .pipe(
        mergeMap((danhMucDauSoCmnd: HttpResponse<IDanhMucDauSoCmnd>) => {
          if (danhMucDauSoCmnd.body) {
            return of(danhMucDauSoCmnd.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucDauSoCmndResolve;
