import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucLoaiVanBanComponent } from './list/danh-muc-loai-van-ban.component';
import { DanhMucLoaiVanBanDetailComponent } from './detail/danh-muc-loai-van-ban-detail.component';
import { DanhMucLoaiVanBanUpdateComponent } from './update/danh-muc-loai-van-ban-update.component';
import DanhMucLoaiVanBanResolve from './route/danh-muc-loai-van-ban-routing-resolve.service';

const danhMucLoaiVanBanRoute: Routes = [
  {
    path: '',
    component: DanhMucLoaiVanBanComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucLoaiVanBanDetailComponent,
    resolve: {
      danhMucLoaiVanBan: DanhMucLoaiVanBanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucLoaiVanBanUpdateComponent,
    resolve: {
      danhMucLoaiVanBan: DanhMucLoaiVanBanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucLoaiVanBanUpdateComponent,
    resolve: {
      danhMucLoaiVanBan: DanhMucLoaiVanBanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucLoaiVanBanRoute;
