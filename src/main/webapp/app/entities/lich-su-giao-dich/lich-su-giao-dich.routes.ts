import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { LichSuGiaoDichComponent } from './list/lich-su-giao-dich.component';
import { LichSuGiaoDichDetailComponent } from './detail/lich-su-giao-dich-detail.component';
import { LichSuGiaoDichUpdateComponent } from './update/lich-su-giao-dich-update.component';
import LichSuGiaoDichResolve from './route/lich-su-giao-dich-routing-resolve.service';

const lichSuGiaoDichRoute: Routes = [
  {
    path: '',
    component: LichSuGiaoDichComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LichSuGiaoDichDetailComponent,
    resolve: {
      lichSuGiaoDich: LichSuGiaoDichResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LichSuGiaoDichUpdateComponent,
    resolve: {
      lichSuGiaoDich: LichSuGiaoDichResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LichSuGiaoDichUpdateComponent,
    resolve: {
      lichSuGiaoDich: LichSuGiaoDichResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default lichSuGiaoDichRoute;
