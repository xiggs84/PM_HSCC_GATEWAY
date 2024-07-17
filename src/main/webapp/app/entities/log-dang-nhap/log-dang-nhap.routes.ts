import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { LogDangNhapComponent } from './list/log-dang-nhap.component';
import { LogDangNhapDetailComponent } from './detail/log-dang-nhap-detail.component';
import { LogDangNhapUpdateComponent } from './update/log-dang-nhap-update.component';
import LogDangNhapResolve from './route/log-dang-nhap-routing-resolve.service';

const logDangNhapRoute: Routes = [
  {
    path: '',
    component: LogDangNhapComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LogDangNhapDetailComponent,
    resolve: {
      logDangNhap: LogDangNhapResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogDangNhapUpdateComponent,
    resolve: {
      logDangNhap: LogDangNhapResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LogDangNhapUpdateComponent,
    resolve: {
      logDangNhap: LogDangNhapResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default logDangNhapRoute;
