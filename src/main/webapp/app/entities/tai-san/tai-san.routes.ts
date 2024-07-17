import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TaiSanComponent } from './list/tai-san.component';
import { TaiSanDetailComponent } from './detail/tai-san-detail.component';
import { TaiSanUpdateComponent } from './update/tai-san-update.component';
import TaiSanResolve from './route/tai-san-routing-resolve.service';

const taiSanRoute: Routes = [
  {
    path: '',
    component: TaiSanComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaiSanDetailComponent,
    resolve: {
      taiSan: TaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaiSanUpdateComponent,
    resolve: {
      taiSan: TaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaiSanUpdateComponent,
    resolve: {
      taiSan: TaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taiSanRoute;
