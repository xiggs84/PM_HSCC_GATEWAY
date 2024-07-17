import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucTinhTrangHonNhanComponent } from './list/danh-muc-tinh-trang-hon-nhan.component';
import { DanhMucTinhTrangHonNhanDetailComponent } from './detail/danh-muc-tinh-trang-hon-nhan-detail.component';
import { DanhMucTinhTrangHonNhanUpdateComponent } from './update/danh-muc-tinh-trang-hon-nhan-update.component';
import DanhMucTinhTrangHonNhanResolve from './route/danh-muc-tinh-trang-hon-nhan-routing-resolve.service';

const danhMucTinhTrangHonNhanRoute: Routes = [
  {
    path: '',
    component: DanhMucTinhTrangHonNhanComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucTinhTrangHonNhanDetailComponent,
    resolve: {
      danhMucTinhTrangHonNhan: DanhMucTinhTrangHonNhanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucTinhTrangHonNhanUpdateComponent,
    resolve: {
      danhMucTinhTrangHonNhan: DanhMucTinhTrangHonNhanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucTinhTrangHonNhanUpdateComponent,
    resolve: {
      danhMucTinhTrangHonNhan: DanhMucTinhTrangHonNhanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucTinhTrangHonNhanRoute;
