import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucLoaiSoCongChungComponent } from './list/danh-muc-loai-so-cong-chung.component';
import { DanhMucLoaiSoCongChungDetailComponent } from './detail/danh-muc-loai-so-cong-chung-detail.component';
import { DanhMucLoaiSoCongChungUpdateComponent } from './update/danh-muc-loai-so-cong-chung-update.component';
import DanhMucLoaiSoCongChungResolve from './route/danh-muc-loai-so-cong-chung-routing-resolve.service';

const danhMucLoaiSoCongChungRoute: Routes = [
  {
    path: '',
    component: DanhMucLoaiSoCongChungComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucLoaiSoCongChungDetailComponent,
    resolve: {
      danhMucLoaiSoCongChung: DanhMucLoaiSoCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucLoaiSoCongChungUpdateComponent,
    resolve: {
      danhMucLoaiSoCongChung: DanhMucLoaiSoCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucLoaiSoCongChungUpdateComponent,
    resolve: {
      danhMucLoaiSoCongChung: DanhMucLoaiSoCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucLoaiSoCongChungRoute;
