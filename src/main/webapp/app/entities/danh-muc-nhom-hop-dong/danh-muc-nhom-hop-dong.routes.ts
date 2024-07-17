import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucNhomHopDongComponent } from './list/danh-muc-nhom-hop-dong.component';
import { DanhMucNhomHopDongDetailComponent } from './detail/danh-muc-nhom-hop-dong-detail.component';
import { DanhMucNhomHopDongUpdateComponent } from './update/danh-muc-nhom-hop-dong-update.component';
import DanhMucNhomHopDongResolve from './route/danh-muc-nhom-hop-dong-routing-resolve.service';

const danhMucNhomHopDongRoute: Routes = [
  {
    path: '',
    component: DanhMucNhomHopDongComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucNhomHopDongDetailComponent,
    resolve: {
      danhMucNhomHopDong: DanhMucNhomHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucNhomHopDongUpdateComponent,
    resolve: {
      danhMucNhomHopDong: DanhMucNhomHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucNhomHopDongUpdateComponent,
    resolve: {
      danhMucNhomHopDong: DanhMucNhomHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucNhomHopDongRoute;
