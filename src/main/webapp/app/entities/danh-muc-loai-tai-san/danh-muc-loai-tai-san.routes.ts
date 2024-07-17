import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucLoaiTaiSanComponent } from './list/danh-muc-loai-tai-san.component';
import { DanhMucLoaiTaiSanDetailComponent } from './detail/danh-muc-loai-tai-san-detail.component';
import { DanhMucLoaiTaiSanUpdateComponent } from './update/danh-muc-loai-tai-san-update.component';
import DanhMucLoaiTaiSanResolve from './route/danh-muc-loai-tai-san-routing-resolve.service';

const danhMucLoaiTaiSanRoute: Routes = [
  {
    path: '',
    component: DanhMucLoaiTaiSanComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucLoaiTaiSanDetailComponent,
    resolve: {
      danhMucLoaiTaiSan: DanhMucLoaiTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucLoaiTaiSanUpdateComponent,
    resolve: {
      danhMucLoaiTaiSan: DanhMucLoaiTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucLoaiTaiSanUpdateComponent,
    resolve: {
      danhMucLoaiTaiSan: DanhMucLoaiTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucLoaiTaiSanRoute;
