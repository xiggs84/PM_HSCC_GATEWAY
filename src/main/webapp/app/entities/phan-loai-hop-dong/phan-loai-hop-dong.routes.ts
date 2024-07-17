import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { PhanLoaiHopDongComponent } from './list/phan-loai-hop-dong.component';
import { PhanLoaiHopDongDetailComponent } from './detail/phan-loai-hop-dong-detail.component';
import { PhanLoaiHopDongUpdateComponent } from './update/phan-loai-hop-dong-update.component';
import PhanLoaiHopDongResolve from './route/phan-loai-hop-dong-routing-resolve.service';

const phanLoaiHopDongRoute: Routes = [
  {
    path: '',
    component: PhanLoaiHopDongComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PhanLoaiHopDongDetailComponent,
    resolve: {
      phanLoaiHopDong: PhanLoaiHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PhanLoaiHopDongUpdateComponent,
    resolve: {
      phanLoaiHopDong: PhanLoaiHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PhanLoaiHopDongUpdateComponent,
    resolve: {
      phanLoaiHopDong: PhanLoaiHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default phanLoaiHopDongRoute;
