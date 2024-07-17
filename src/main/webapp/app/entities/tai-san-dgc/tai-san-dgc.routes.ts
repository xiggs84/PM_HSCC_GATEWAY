import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TaiSanDgcComponent } from './list/tai-san-dgc.component';
import { TaiSanDgcDetailComponent } from './detail/tai-san-dgc-detail.component';
import { TaiSanDgcUpdateComponent } from './update/tai-san-dgc-update.component';
import TaiSanDgcResolve from './route/tai-san-dgc-routing-resolve.service';

const taiSanDgcRoute: Routes = [
  {
    path: '',
    component: TaiSanDgcComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaiSanDgcDetailComponent,
    resolve: {
      taiSanDgc: TaiSanDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaiSanDgcUpdateComponent,
    resolve: {
      taiSanDgc: TaiSanDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaiSanDgcUpdateComponent,
    resolve: {
      taiSanDgc: TaiSanDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taiSanDgcRoute;
