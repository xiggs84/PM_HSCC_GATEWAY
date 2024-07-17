import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CanBoQuyenComponent } from './list/can-bo-quyen.component';
import { CanBoQuyenDetailComponent } from './detail/can-bo-quyen-detail.component';
import { CanBoQuyenUpdateComponent } from './update/can-bo-quyen-update.component';
import CanBoQuyenResolve from './route/can-bo-quyen-routing-resolve.service';

const canBoQuyenRoute: Routes = [
  {
    path: '',
    component: CanBoQuyenComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CanBoQuyenDetailComponent,
    resolve: {
      canBoQuyen: CanBoQuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CanBoQuyenUpdateComponent,
    resolve: {
      canBoQuyen: CanBoQuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CanBoQuyenUpdateComponent,
    resolve: {
      canBoQuyen: CanBoQuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default canBoQuyenRoute;
