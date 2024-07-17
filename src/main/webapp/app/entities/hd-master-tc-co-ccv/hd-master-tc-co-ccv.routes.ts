import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { HdMasterTcCoCcvComponent } from './list/hd-master-tc-co-ccv.component';
import { HdMasterTcCoCcvDetailComponent } from './detail/hd-master-tc-co-ccv-detail.component';
import { HdMasterTcCoCcvUpdateComponent } from './update/hd-master-tc-co-ccv-update.component';
import HdMasterTcCoCcvResolve from './route/hd-master-tc-co-ccv-routing-resolve.service';

const hdMasterTcCoCcvRoute: Routes = [
  {
    path: '',
    component: HdMasterTcCoCcvComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HdMasterTcCoCcvDetailComponent,
    resolve: {
      hdMasterTcCoCcv: HdMasterTcCoCcvResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HdMasterTcCoCcvUpdateComponent,
    resolve: {
      hdMasterTcCoCcv: HdMasterTcCoCcvResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HdMasterTcCoCcvUpdateComponent,
    resolve: {
      hdMasterTcCoCcv: HdMasterTcCoCcvResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default hdMasterTcCoCcvRoute;
