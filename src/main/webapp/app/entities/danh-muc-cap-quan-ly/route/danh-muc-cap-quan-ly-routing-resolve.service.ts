import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucCapQuanLy } from '../danh-muc-cap-quan-ly.model';
import { DanhMucCapQuanLyService } from '../service/danh-muc-cap-quan-ly.service';

const danhMucCapQuanLyResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucCapQuanLy> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucCapQuanLyService)
      .find(id)
      .pipe(
        mergeMap((danhMucCapQuanLy: HttpResponse<IDanhMucCapQuanLy>) => {
          if (danhMucCapQuanLy.body) {
            return of(danhMucCapQuanLy.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucCapQuanLyResolve;
