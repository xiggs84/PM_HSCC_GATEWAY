import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucTheHtml } from '../danh-muc-the-html.model';
import { DanhMucTheHtmlService } from '../service/danh-muc-the-html.service';

const danhMucTheHtmlResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucTheHtml> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucTheHtmlService)
      .find(id)
      .pipe(
        mergeMap((danhMucTheHtml: HttpResponse<IDanhMucTheHtml>) => {
          if (danhMucTheHtml.body) {
            return of(danhMucTheHtml.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucTheHtmlResolve;
