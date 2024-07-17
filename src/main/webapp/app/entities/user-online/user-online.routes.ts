import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { UserOnlineComponent } from './list/user-online.component';
import { UserOnlineDetailComponent } from './detail/user-online-detail.component';
import { UserOnlineUpdateComponent } from './update/user-online-update.component';
import UserOnlineResolve from './route/user-online-routing-resolve.service';

const userOnlineRoute: Routes = [
  {
    path: '',
    component: UserOnlineComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserOnlineDetailComponent,
    resolve: {
      userOnline: UserOnlineResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserOnlineUpdateComponent,
    resolve: {
      userOnline: UserOnlineResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserOnlineUpdateComponent,
    resolve: {
      userOnline: UserOnlineResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default userOnlineRoute;
