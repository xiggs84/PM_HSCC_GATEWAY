import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucLoaiHopDongComponent } from './list/danh-muc-loai-hop-dong.component';
import { DanhMucLoaiHopDongDetailComponent } from './detail/danh-muc-loai-hop-dong-detail.component';
import { DanhMucLoaiHopDongUpdateComponent } from './update/danh-muc-loai-hop-dong-update.component';
import DanhMucLoaiHopDongResolve from './route/danh-muc-loai-hop-dong-routing-resolve.service';

const danhMucLoaiHopDongRoute: Routes = [
  {
    path: '',
    component: DanhMucLoaiHopDongComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucLoaiHopDongDetailComponent,
    resolve: {
      danhMucLoaiHopDong: DanhMucLoaiHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucLoaiHopDongUpdateComponent,
    resolve: {
      danhMucLoaiHopDong: DanhMucLoaiHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucLoaiHopDongUpdateComponent,
    resolve: {
      danhMucLoaiHopDong: DanhMucLoaiHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucLoaiHopDongRoute;
