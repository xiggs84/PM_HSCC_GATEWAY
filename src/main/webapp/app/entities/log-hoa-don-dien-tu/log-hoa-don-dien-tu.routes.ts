import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { LogHoaDonDienTuComponent } from './list/log-hoa-don-dien-tu.component';
import { LogHoaDonDienTuDetailComponent } from './detail/log-hoa-don-dien-tu-detail.component';
import { LogHoaDonDienTuUpdateComponent } from './update/log-hoa-don-dien-tu-update.component';
import LogHoaDonDienTuResolve from './route/log-hoa-don-dien-tu-routing-resolve.service';

const logHoaDonDienTuRoute: Routes = [
  {
    path: '',
    component: LogHoaDonDienTuComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LogHoaDonDienTuDetailComponent,
    resolve: {
      logHoaDonDienTu: LogHoaDonDienTuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogHoaDonDienTuUpdateComponent,
    resolve: {
      logHoaDonDienTu: LogHoaDonDienTuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LogHoaDonDienTuUpdateComponent,
    resolve: {
      logHoaDonDienTu: LogHoaDonDienTuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default logHoaDonDienTuRoute;
