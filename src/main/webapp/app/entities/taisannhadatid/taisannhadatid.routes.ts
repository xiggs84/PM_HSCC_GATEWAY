import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TaisannhadatidComponent } from './list/taisannhadatid.component';
import { TaisannhadatidDetailComponent } from './detail/taisannhadatid-detail.component';
import { TaisannhadatidUpdateComponent } from './update/taisannhadatid-update.component';
import TaisannhadatidResolve from './route/taisannhadatid-routing-resolve.service';

const taisannhadatidRoute: Routes = [
  {
    path: '',
    component: TaisannhadatidComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaisannhadatidDetailComponent,
    resolve: {
      taisannhadatid: TaisannhadatidResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaisannhadatidUpdateComponent,
    resolve: {
      taisannhadatid: TaisannhadatidResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaisannhadatidUpdateComponent,
    resolve: {
      taisannhadatid: TaisannhadatidResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taisannhadatidRoute;
