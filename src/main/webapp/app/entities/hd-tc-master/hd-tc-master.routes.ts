import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { HdTcMasterComponent } from './list/hd-tc-master.component';
import { HdTcMasterDetailComponent } from './detail/hd-tc-master-detail.component';
import { HdTcMasterUpdateComponent } from './update/hd-tc-master-update.component';
import HdTcMasterResolve from './route/hd-tc-master-routing-resolve.service';

const hdTcMasterRoute: Routes = [
  {
    path: '',
    component: HdTcMasterComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HdTcMasterDetailComponent,
    resolve: {
      hdTcMaster: HdTcMasterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HdTcMasterUpdateComponent,
    resolve: {
      hdTcMaster: HdTcMasterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HdTcMasterUpdateComponent,
    resolve: {
      hdTcMaster: HdTcMasterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default hdTcMasterRoute;
