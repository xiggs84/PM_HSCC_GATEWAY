import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TaisanSaiDgcComponent } from './list/taisan-sai-dgc.component';
import { TaisanSaiDgcDetailComponent } from './detail/taisan-sai-dgc-detail.component';
import { TaisanSaiDgcUpdateComponent } from './update/taisan-sai-dgc-update.component';
import TaisanSaiDgcResolve from './route/taisan-sai-dgc-routing-resolve.service';

const taisanSaiDgcRoute: Routes = [
  {
    path: '',
    component: TaisanSaiDgcComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaisanSaiDgcDetailComponent,
    resolve: {
      taisanSaiDgc: TaisanSaiDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaisanSaiDgcUpdateComponent,
    resolve: {
      taisanSaiDgc: TaisanSaiDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaisanSaiDgcUpdateComponent,
    resolve: {
      taisanSaiDgc: TaisanSaiDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taisanSaiDgcRoute;
