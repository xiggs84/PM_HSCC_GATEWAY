import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TinhTrangTaiSanComponent } from './list/tinh-trang-tai-san.component';
import { TinhTrangTaiSanDetailComponent } from './detail/tinh-trang-tai-san-detail.component';
import { TinhTrangTaiSanUpdateComponent } from './update/tinh-trang-tai-san-update.component';
import TinhTrangTaiSanResolve from './route/tinh-trang-tai-san-routing-resolve.service';

const tinhTrangTaiSanRoute: Routes = [
  {
    path: '',
    component: TinhTrangTaiSanComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TinhTrangTaiSanDetailComponent,
    resolve: {
      tinhTrangTaiSan: TinhTrangTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TinhTrangTaiSanUpdateComponent,
    resolve: {
      tinhTrangTaiSan: TinhTrangTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TinhTrangTaiSanUpdateComponent,
    resolve: {
      tinhTrangTaiSan: TinhTrangTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tinhTrangTaiSanRoute;
