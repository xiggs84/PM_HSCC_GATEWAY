import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { HopDongCongChungComponent } from './list/hop-dong-cong-chung.component';
import { HopDongCongChungDetailComponent } from './detail/hop-dong-cong-chung-detail.component';
import { HopDongCongChungUpdateComponent } from './update/hop-dong-cong-chung-update.component';
import HopDongCongChungResolve from './route/hop-dong-cong-chung-routing-resolve.service';

const hopDongCongChungRoute: Routes = [
  {
    path: '',
    component: HopDongCongChungComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HopDongCongChungDetailComponent,
    resolve: {
      hopDongCongChung: HopDongCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HopDongCongChungUpdateComponent,
    resolve: {
      hopDongCongChung: HopDongCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HopDongCongChungUpdateComponent,
    resolve: {
      hopDongCongChung: HopDongCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default hopDongCongChungRoute;
