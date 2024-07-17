import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TaisanSaiQsddDgcComponent } from './list/taisan-sai-qsdd-dgc.component';
import { TaisanSaiQsddDgcDetailComponent } from './detail/taisan-sai-qsdd-dgc-detail.component';
import { TaisanSaiQsddDgcUpdateComponent } from './update/taisan-sai-qsdd-dgc-update.component';
import TaisanSaiQsddDgcResolve from './route/taisan-sai-qsdd-dgc-routing-resolve.service';

const taisanSaiQsddDgcRoute: Routes = [
  {
    path: '',
    component: TaisanSaiQsddDgcComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaisanSaiQsddDgcDetailComponent,
    resolve: {
      taisanSaiQsddDgc: TaisanSaiQsddDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaisanSaiQsddDgcUpdateComponent,
    resolve: {
      taisanSaiQsddDgc: TaisanSaiQsddDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaisanSaiQsddDgcUpdateComponent,
    resolve: {
      taisanSaiQsddDgc: TaisanSaiQsddDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taisanSaiQsddDgcRoute;
