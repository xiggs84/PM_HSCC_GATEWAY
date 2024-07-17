import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucLoaiDuongSuComponent } from './list/danh-muc-loai-duong-su.component';
import { DanhMucLoaiDuongSuDetailComponent } from './detail/danh-muc-loai-duong-su-detail.component';
import { DanhMucLoaiDuongSuUpdateComponent } from './update/danh-muc-loai-duong-su-update.component';
import DanhMucLoaiDuongSuResolve from './route/danh-muc-loai-duong-su-routing-resolve.service';

const danhMucLoaiDuongSuRoute: Routes = [
  {
    path: '',
    component: DanhMucLoaiDuongSuComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucLoaiDuongSuDetailComponent,
    resolve: {
      danhMucLoaiDuongSu: DanhMucLoaiDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucLoaiDuongSuUpdateComponent,
    resolve: {
      danhMucLoaiDuongSu: DanhMucLoaiDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucLoaiDuongSuUpdateComponent,
    resolve: {
      danhMucLoaiDuongSu: DanhMucLoaiDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucLoaiDuongSuRoute;
