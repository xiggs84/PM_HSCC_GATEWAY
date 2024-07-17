import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucTuVietTatComponent } from './list/danh-muc-tu-viet-tat.component';
import { DanhMucTuVietTatDetailComponent } from './detail/danh-muc-tu-viet-tat-detail.component';
import { DanhMucTuVietTatUpdateComponent } from './update/danh-muc-tu-viet-tat-update.component';
import DanhMucTuVietTatResolve from './route/danh-muc-tu-viet-tat-routing-resolve.service';

const danhMucTuVietTatRoute: Routes = [
  {
    path: '',
    component: DanhMucTuVietTatComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucTuVietTatDetailComponent,
    resolve: {
      danhMucTuVietTat: DanhMucTuVietTatResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucTuVietTatUpdateComponent,
    resolve: {
      danhMucTuVietTat: DanhMucTuVietTatResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucTuVietTatUpdateComponent,
    resolve: {
      danhMucTuVietTat: DanhMucTuVietTatResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucTuVietTatRoute;
