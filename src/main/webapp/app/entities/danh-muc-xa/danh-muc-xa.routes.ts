import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucXaComponent } from './list/danh-muc-xa.component';
import { DanhMucXaDetailComponent } from './detail/danh-muc-xa-detail.component';
import { DanhMucXaUpdateComponent } from './update/danh-muc-xa-update.component';
import DanhMucXaResolve from './route/danh-muc-xa-routing-resolve.service';

const danhMucXaRoute: Routes = [
  {
    path: '',
    component: DanhMucXaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucXaDetailComponent,
    resolve: {
      danhMucXa: DanhMucXaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucXaUpdateComponent,
    resolve: {
      danhMucXa: DanhMucXaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucXaUpdateComponent,
    resolve: {
      danhMucXa: DanhMucXaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucXaRoute;
