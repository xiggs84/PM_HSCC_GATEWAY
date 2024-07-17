import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DmNoiCapGpdkxComponent } from './list/dm-noi-cap-gpdkx.component';
import { DmNoiCapGpdkxDetailComponent } from './detail/dm-noi-cap-gpdkx-detail.component';
import { DmNoiCapGpdkxUpdateComponent } from './update/dm-noi-cap-gpdkx-update.component';
import DmNoiCapGpdkxResolve from './route/dm-noi-cap-gpdkx-routing-resolve.service';

const dmNoiCapGpdkxRoute: Routes = [
  {
    path: '',
    component: DmNoiCapGpdkxComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DmNoiCapGpdkxDetailComponent,
    resolve: {
      dmNoiCapGpdkx: DmNoiCapGpdkxResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DmNoiCapGpdkxUpdateComponent,
    resolve: {
      dmNoiCapGpdkx: DmNoiCapGpdkxResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DmNoiCapGpdkxUpdateComponent,
    resolve: {
      dmNoiCapGpdkx: DmNoiCapGpdkxResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dmNoiCapGpdkxRoute;
