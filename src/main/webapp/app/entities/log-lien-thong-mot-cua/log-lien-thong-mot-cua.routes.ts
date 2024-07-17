import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { LogLienThongMotCuaComponent } from './list/log-lien-thong-mot-cua.component';
import { LogLienThongMotCuaDetailComponent } from './detail/log-lien-thong-mot-cua-detail.component';
import { LogLienThongMotCuaUpdateComponent } from './update/log-lien-thong-mot-cua-update.component';
import LogLienThongMotCuaResolve from './route/log-lien-thong-mot-cua-routing-resolve.service';

const logLienThongMotCuaRoute: Routes = [
  {
    path: '',
    component: LogLienThongMotCuaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LogLienThongMotCuaDetailComponent,
    resolve: {
      logLienThongMotCua: LogLienThongMotCuaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogLienThongMotCuaUpdateComponent,
    resolve: {
      logLienThongMotCua: LogLienThongMotCuaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LogLienThongMotCuaUpdateComponent,
    resolve: {
      logLienThongMotCua: LogLienThongMotCuaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default logLienThongMotCuaRoute;
