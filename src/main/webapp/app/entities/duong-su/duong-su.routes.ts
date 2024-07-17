import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DuongSuComponent } from './list/duong-su.component';
import { DuongSuDetailComponent } from './detail/duong-su-detail.component';
import { DuongSuUpdateComponent } from './update/duong-su-update.component';
import DuongSuResolve from './route/duong-su-routing-resolve.service';

const duongSuRoute: Routes = [
  {
    path: '',
    component: DuongSuComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DuongSuDetailComponent,
    resolve: {
      duongSu: DuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DuongSuUpdateComponent,
    resolve: {
      duongSu: DuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DuongSuUpdateComponent,
    resolve: {
      duongSu: DuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default duongSuRoute;
