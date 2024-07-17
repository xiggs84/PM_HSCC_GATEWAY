import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ChiTietNganChanComponent } from './list/chi-tiet-ngan-chan.component';
import { ChiTietNganChanDetailComponent } from './detail/chi-tiet-ngan-chan-detail.component';
import { ChiTietNganChanUpdateComponent } from './update/chi-tiet-ngan-chan-update.component';
import ChiTietNganChanResolve from './route/chi-tiet-ngan-chan-routing-resolve.service';

const chiTietNganChanRoute: Routes = [
  {
    path: '',
    component: ChiTietNganChanComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChiTietNganChanDetailComponent,
    resolve: {
      chiTietNganChan: ChiTietNganChanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChiTietNganChanUpdateComponent,
    resolve: {
      chiTietNganChan: ChiTietNganChanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChiTietNganChanUpdateComponent,
    resolve: {
      chiTietNganChan: ChiTietNganChanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default chiTietNganChanRoute;
