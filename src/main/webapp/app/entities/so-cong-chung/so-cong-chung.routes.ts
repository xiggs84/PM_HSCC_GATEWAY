import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { SoCongChungComponent } from './list/so-cong-chung.component';
import { SoCongChungDetailComponent } from './detail/so-cong-chung-detail.component';
import { SoCongChungUpdateComponent } from './update/so-cong-chung-update.component';
import SoCongChungResolve from './route/so-cong-chung-routing-resolve.service';

const soCongChungRoute: Routes = [
  {
    path: '',
    component: SoCongChungComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SoCongChungDetailComponent,
    resolve: {
      soCongChung: SoCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SoCongChungUpdateComponent,
    resolve: {
      soCongChung: SoCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SoCongChungUpdateComponent,
    resolve: {
      soCongChung: SoCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default soCongChungRoute;
