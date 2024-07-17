import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhSachTaiSanComponent } from './list/danh-sach-tai-san.component';
import { DanhSachTaiSanDetailComponent } from './detail/danh-sach-tai-san-detail.component';
import { DanhSachTaiSanUpdateComponent } from './update/danh-sach-tai-san-update.component';
import DanhSachTaiSanResolve from './route/danh-sach-tai-san-routing-resolve.service';

const danhSachTaiSanRoute: Routes = [
  {
    path: '',
    component: DanhSachTaiSanComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhSachTaiSanDetailComponent,
    resolve: {
      danhSachTaiSan: DanhSachTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhSachTaiSanUpdateComponent,
    resolve: {
      danhSachTaiSan: DanhSachTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhSachTaiSanUpdateComponent,
    resolve: {
      danhSachTaiSan: DanhSachTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhSachTaiSanRoute;
