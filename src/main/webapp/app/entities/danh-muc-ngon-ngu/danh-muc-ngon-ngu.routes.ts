import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucNgonNguComponent } from './list/danh-muc-ngon-ngu.component';
import { DanhMucNgonNguDetailComponent } from './detail/danh-muc-ngon-ngu-detail.component';
import { DanhMucNgonNguUpdateComponent } from './update/danh-muc-ngon-ngu-update.component';
import DanhMucNgonNguResolve from './route/danh-muc-ngon-ngu-routing-resolve.service';

const danhMucNgonNguRoute: Routes = [
  {
    path: '',
    component: DanhMucNgonNguComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucNgonNguDetailComponent,
    resolve: {
      danhMucNgonNgu: DanhMucNgonNguResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucNgonNguUpdateComponent,
    resolve: {
      danhMucNgonNgu: DanhMucNgonNguResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucNgonNguUpdateComponent,
    resolve: {
      danhMucNgonNgu: DanhMucNgonNguResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucNgonNguRoute;
