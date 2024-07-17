import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { NoiCapGtttComponent } from './list/noi-cap-gttt.component';
import { NoiCapGtttDetailComponent } from './detail/noi-cap-gttt-detail.component';
import { NoiCapGtttUpdateComponent } from './update/noi-cap-gttt-update.component';
import NoiCapGtttResolve from './route/noi-cap-gttt-routing-resolve.service';

const noiCapGtttRoute: Routes = [
  {
    path: '',
    component: NoiCapGtttComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NoiCapGtttDetailComponent,
    resolve: {
      noiCapGttt: NoiCapGtttResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NoiCapGtttUpdateComponent,
    resolve: {
      noiCapGttt: NoiCapGtttResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NoiCapGtttUpdateComponent,
    resolve: {
      noiCapGttt: NoiCapGtttResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default noiCapGtttRoute;
