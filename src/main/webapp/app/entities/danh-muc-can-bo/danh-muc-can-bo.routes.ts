import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucCanBoComponent } from './list/danh-muc-can-bo.component';
import { DanhMucCanBoDetailComponent } from './detail/danh-muc-can-bo-detail.component';
import { DanhMucCanBoUpdateComponent } from './update/danh-muc-can-bo-update.component';
import DanhMucCanBoResolve from './route/danh-muc-can-bo-routing-resolve.service';

const danhMucCanBoRoute: Routes = [
  {
    path: '',
    component: DanhMucCanBoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucCanBoDetailComponent,
    resolve: {
      danhMucCanBo: DanhMucCanBoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucCanBoUpdateComponent,
    resolve: {
      danhMucCanBo: DanhMucCanBoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucCanBoUpdateComponent,
    resolve: {
      danhMucCanBo: DanhMucCanBoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucCanBoRoute;
