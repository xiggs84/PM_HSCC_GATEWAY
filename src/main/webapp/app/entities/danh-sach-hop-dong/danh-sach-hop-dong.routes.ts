import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhSachHopDongComponent } from './list/danh-sach-hop-dong.component';
import { DanhSachHopDongDetailComponent } from './detail/danh-sach-hop-dong-detail.component';
import { DanhSachHopDongUpdateComponent } from './update/danh-sach-hop-dong-update.component';
import DanhSachHopDongResolve from './route/danh-sach-hop-dong-routing-resolve.service';

const danhSachHopDongRoute: Routes = [
  {
    path: '',
    component: DanhSachHopDongComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhSachHopDongDetailComponent,
    resolve: {
      danhSachHopDong: DanhSachHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhSachHopDongUpdateComponent,
    resolve: {
      danhSachHopDong: DanhSachHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhSachHopDongUpdateComponent,
    resolve: {
      danhSachHopDong: DanhSachHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhSachHopDongRoute;
