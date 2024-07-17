import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucDichVuComponent } from './list/danh-muc-dich-vu.component';
import { DanhMucDichVuDetailComponent } from './detail/danh-muc-dich-vu-detail.component';
import { DanhMucDichVuUpdateComponent } from './update/danh-muc-dich-vu-update.component';
import DanhMucDichVuResolve from './route/danh-muc-dich-vu-routing-resolve.service';

const danhMucDichVuRoute: Routes = [
  {
    path: '',
    component: DanhMucDichVuComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucDichVuDetailComponent,
    resolve: {
      danhMucDichVu: DanhMucDichVuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucDichVuUpdateComponent,
    resolve: {
      danhMucDichVu: DanhMucDichVuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucDichVuUpdateComponent,
    resolve: {
      danhMucDichVu: DanhMucDichVuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucDichVuRoute;
