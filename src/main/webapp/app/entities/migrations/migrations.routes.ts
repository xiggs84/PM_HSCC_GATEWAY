import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { MigrationsComponent } from './list/migrations.component';
import { MigrationsDetailComponent } from './detail/migrations-detail.component';
import { MigrationsUpdateComponent } from './update/migrations-update.component';
import MigrationsResolve from './route/migrations-routing-resolve.service';

const migrationsRoute: Routes = [
  {
    path: '',
    component: MigrationsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MigrationsDetailComponent,
    resolve: {
      migrations: MigrationsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MigrationsUpdateComponent,
    resolve: {
      migrations: MigrationsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MigrationsUpdateComponent,
    resolve: {
      migrations: MigrationsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default migrationsRoute;
