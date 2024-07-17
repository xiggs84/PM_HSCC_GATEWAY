import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhSachDuongSuComponent } from './list/danh-sach-duong-su.component';
import { DanhSachDuongSuDetailComponent } from './detail/danh-sach-duong-su-detail.component';
import { DanhSachDuongSuUpdateComponent } from './update/danh-sach-duong-su-update.component';
import DanhSachDuongSuResolve from './route/danh-sach-duong-su-routing-resolve.service';

const danhSachDuongSuRoute: Routes = [
  {
    path: '',
    component: DanhSachDuongSuComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhSachDuongSuDetailComponent,
    resolve: {
      danhSachDuongSu: DanhSachDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhSachDuongSuUpdateComponent,
    resolve: {
      danhSachDuongSu: DanhSachDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhSachDuongSuUpdateComponent,
    resolve: {
      danhSachDuongSu: DanhSachDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhSachDuongSuRoute;
