import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TinhTrangDuongSuComponent } from './list/tinh-trang-duong-su.component';
import { TinhTrangDuongSuDetailComponent } from './detail/tinh-trang-duong-su-detail.component';
import { TinhTrangDuongSuUpdateComponent } from './update/tinh-trang-duong-su-update.component';
import TinhTrangDuongSuResolve from './route/tinh-trang-duong-su-routing-resolve.service';

const tinhTrangDuongSuRoute: Routes = [
  {
    path: '',
    component: TinhTrangDuongSuComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TinhTrangDuongSuDetailComponent,
    resolve: {
      tinhTrangDuongSu: TinhTrangDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TinhTrangDuongSuUpdateComponent,
    resolve: {
      tinhTrangDuongSu: TinhTrangDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TinhTrangDuongSuUpdateComponent,
    resolve: {
      tinhTrangDuongSu: TinhTrangDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tinhTrangDuongSuRoute;
