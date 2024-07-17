import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucLoaiDonViComponent } from './list/danh-muc-loai-don-vi.component';
import { DanhMucLoaiDonViDetailComponent } from './detail/danh-muc-loai-don-vi-detail.component';
import { DanhMucLoaiDonViUpdateComponent } from './update/danh-muc-loai-don-vi-update.component';
import DanhMucLoaiDonViResolve from './route/danh-muc-loai-don-vi-routing-resolve.service';

const danhMucLoaiDonViRoute: Routes = [
  {
    path: '',
    component: DanhMucLoaiDonViComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucLoaiDonViDetailComponent,
    resolve: {
      danhMucLoaiDonVi: DanhMucLoaiDonViResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucLoaiDonViUpdateComponent,
    resolve: {
      danhMucLoaiDonVi: DanhMucLoaiDonViResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucLoaiDonViUpdateComponent,
    resolve: {
      danhMucLoaiDonVi: DanhMucLoaiDonViResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucLoaiDonViRoute;
