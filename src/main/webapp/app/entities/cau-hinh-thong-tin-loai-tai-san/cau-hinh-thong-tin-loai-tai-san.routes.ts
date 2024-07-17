import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CauHinhThongTinLoaiTaiSanComponent } from './list/cau-hinh-thong-tin-loai-tai-san.component';
import { CauHinhThongTinLoaiTaiSanDetailComponent } from './detail/cau-hinh-thong-tin-loai-tai-san-detail.component';
import { CauHinhThongTinLoaiTaiSanUpdateComponent } from './update/cau-hinh-thong-tin-loai-tai-san-update.component';
import CauHinhThongTinLoaiTaiSanResolve from './route/cau-hinh-thong-tin-loai-tai-san-routing-resolve.service';

const cauHinhThongTinLoaiTaiSanRoute: Routes = [
  {
    path: '',
    component: CauHinhThongTinLoaiTaiSanComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CauHinhThongTinLoaiTaiSanDetailComponent,
    resolve: {
      cauHinhThongTinLoaiTaiSan: CauHinhThongTinLoaiTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CauHinhThongTinLoaiTaiSanUpdateComponent,
    resolve: {
      cauHinhThongTinLoaiTaiSan: CauHinhThongTinLoaiTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CauHinhThongTinLoaiTaiSanUpdateComponent,
    resolve: {
      cauHinhThongTinLoaiTaiSan: CauHinhThongTinLoaiTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cauHinhThongTinLoaiTaiSanRoute;
