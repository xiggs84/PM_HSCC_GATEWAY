import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { LogThaoTacComponent } from './list/log-thao-tac.component';
import { LogThaoTacDetailComponent } from './detail/log-thao-tac-detail.component';
import { LogThaoTacUpdateComponent } from './update/log-thao-tac-update.component';
import LogThaoTacResolve from './route/log-thao-tac-routing-resolve.service';

const logThaoTacRoute: Routes = [
  {
    path: '',
    component: LogThaoTacComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LogThaoTacDetailComponent,
    resolve: {
      logThaoTac: LogThaoTacResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogThaoTacUpdateComponent,
    resolve: {
      logThaoTac: LogThaoTacResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LogThaoTacUpdateComponent,
    resolve: {
      logThaoTac: LogThaoTacResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default logThaoTacRoute;
