import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TaiSanDuongSuComponent } from './list/tai-san-duong-su.component';
import { TaiSanDuongSuDetailComponent } from './detail/tai-san-duong-su-detail.component';
import { TaiSanDuongSuUpdateComponent } from './update/tai-san-duong-su-update.component';
import TaiSanDuongSuResolve from './route/tai-san-duong-su-routing-resolve.service';

const taiSanDuongSuRoute: Routes = [
  {
    path: '',
    component: TaiSanDuongSuComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaiSanDuongSuDetailComponent,
    resolve: {
      taiSanDuongSu: TaiSanDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaiSanDuongSuUpdateComponent,
    resolve: {
      taiSanDuongSu: TaiSanDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaiSanDuongSuUpdateComponent,
    resolve: {
      taiSanDuongSu: TaiSanDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taiSanDuongSuRoute;
