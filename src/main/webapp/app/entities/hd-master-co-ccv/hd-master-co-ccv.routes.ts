import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { HdMasterCoCcvComponent } from './list/hd-master-co-ccv.component';
import { HdMasterCoCcvDetailComponent } from './detail/hd-master-co-ccv-detail.component';
import { HdMasterCoCcvUpdateComponent } from './update/hd-master-co-ccv-update.component';
import HdMasterCoCcvResolve from './route/hd-master-co-ccv-routing-resolve.service';

const hdMasterCoCcvRoute: Routes = [
  {
    path: '',
    component: HdMasterCoCcvComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HdMasterCoCcvDetailComponent,
    resolve: {
      hdMasterCoCcv: HdMasterCoCcvResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HdMasterCoCcvUpdateComponent,
    resolve: {
      hdMasterCoCcv: HdMasterCoCcvResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HdMasterCoCcvUpdateComponent,
    resolve: {
      hdMasterCoCcv: HdMasterCoCcvResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default hdMasterCoCcvRoute;
