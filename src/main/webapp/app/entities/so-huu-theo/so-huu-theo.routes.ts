import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { SoHuuTheoComponent } from './list/so-huu-theo.component';
import { SoHuuTheoDetailComponent } from './detail/so-huu-theo-detail.component';
import { SoHuuTheoUpdateComponent } from './update/so-huu-theo-update.component';
import SoHuuTheoResolve from './route/so-huu-theo-routing-resolve.service';

const soHuuTheoRoute: Routes = [
  {
    path: '',
    component: SoHuuTheoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SoHuuTheoDetailComponent,
    resolve: {
      soHuuTheo: SoHuuTheoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SoHuuTheoUpdateComponent,
    resolve: {
      soHuuTheo: SoHuuTheoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SoHuuTheoUpdateComponent,
    resolve: {
      soHuuTheo: SoHuuTheoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default soHuuTheoRoute;
