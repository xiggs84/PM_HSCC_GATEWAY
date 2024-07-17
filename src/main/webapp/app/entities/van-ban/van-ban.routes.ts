import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { VanBanComponent } from './list/van-ban.component';
import { VanBanDetailComponent } from './detail/van-ban-detail.component';
import { VanBanUpdateComponent } from './update/van-ban-update.component';
import VanBanResolve from './route/van-ban-routing-resolve.service';

const vanBanRoute: Routes = [
  {
    path: '',
    component: VanBanComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VanBanDetailComponent,
    resolve: {
      vanBan: VanBanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VanBanUpdateComponent,
    resolve: {
      vanBan: VanBanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VanBanUpdateComponent,
    resolve: {
      vanBan: VanBanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default vanBanRoute;
