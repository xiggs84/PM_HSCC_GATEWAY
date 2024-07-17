import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TaiSanDatNhaComponent } from './list/tai-san-dat-nha.component';
import { TaiSanDatNhaDetailComponent } from './detail/tai-san-dat-nha-detail.component';
import { TaiSanDatNhaUpdateComponent } from './update/tai-san-dat-nha-update.component';
import TaiSanDatNhaResolve from './route/tai-san-dat-nha-routing-resolve.service';

const taiSanDatNhaRoute: Routes = [
  {
    path: '',
    component: TaiSanDatNhaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaiSanDatNhaDetailComponent,
    resolve: {
      taiSanDatNha: TaiSanDatNhaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaiSanDatNhaUpdateComponent,
    resolve: {
      taiSanDatNha: TaiSanDatNhaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaiSanDatNhaUpdateComponent,
    resolve: {
      taiSanDatNha: TaiSanDatNhaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taiSanDatNhaRoute;
