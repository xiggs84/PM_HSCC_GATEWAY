import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMigrations } from '../migrations.model';
import { MigrationsService } from '../service/migrations.service';

const migrationsResolve = (route: ActivatedRouteSnapshot): Observable<null | IMigrations> => {
  const id = route.params['id'];
  if (id) {
    return inject(MigrationsService)
      .find(id)
      .pipe(
        mergeMap((migrations: HttpResponse<IMigrations>) => {
          if (migrations.body) {
            return of(migrations.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default migrationsResolve;
