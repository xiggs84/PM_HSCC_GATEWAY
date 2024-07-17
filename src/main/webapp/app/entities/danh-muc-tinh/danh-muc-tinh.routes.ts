import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucTinhComponent } from './list/danh-muc-tinh.component';
import { DanhMucTinhDetailComponent } from './detail/danh-muc-tinh-detail.component';
import { DanhMucTinhUpdateComponent } from './update/danh-muc-tinh-update.component';
import DanhMucTinhResolve from './route/danh-muc-tinh-routing-resolve.service';

const danhMucTinhRoute: Routes = [
  {
    path: '',
    component: DanhMucTinhComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucTinhDetailComponent,
    resolve: {
      danhMucTinh: DanhMucTinhResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucTinhUpdateComponent,
    resolve: {
      danhMucTinh: DanhMucTinhResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucTinhUpdateComponent,
    resolve: {
      danhMucTinh: DanhMucTinhResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucTinhRoute;
