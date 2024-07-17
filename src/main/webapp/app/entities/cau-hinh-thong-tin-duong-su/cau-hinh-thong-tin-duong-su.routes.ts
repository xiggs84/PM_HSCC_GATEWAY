import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CauHinhThongTinDuongSuComponent } from './list/cau-hinh-thong-tin-duong-su.component';
import { CauHinhThongTinDuongSuDetailComponent } from './detail/cau-hinh-thong-tin-duong-su-detail.component';
import { CauHinhThongTinDuongSuUpdateComponent } from './update/cau-hinh-thong-tin-duong-su-update.component';
import CauHinhThongTinDuongSuResolve from './route/cau-hinh-thong-tin-duong-su-routing-resolve.service';

const cauHinhThongTinDuongSuRoute: Routes = [
  {
    path: '',
    component: CauHinhThongTinDuongSuComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CauHinhThongTinDuongSuDetailComponent,
    resolve: {
      cauHinhThongTinDuongSu: CauHinhThongTinDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CauHinhThongTinDuongSuUpdateComponent,
    resolve: {
      cauHinhThongTinDuongSu: CauHinhThongTinDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CauHinhThongTinDuongSuUpdateComponent,
    resolve: {
      cauHinhThongTinDuongSu: CauHinhThongTinDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cauHinhThongTinDuongSuRoute;
