import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { LogSearchDsTsComponent } from './list/log-search-ds-ts.component';
import { LogSearchDsTsDetailComponent } from './detail/log-search-ds-ts-detail.component';
import { LogSearchDsTsUpdateComponent } from './update/log-search-ds-ts-update.component';
import LogSearchDsTsResolve from './route/log-search-ds-ts-routing-resolve.service';

const logSearchDsTsRoute: Routes = [
  {
    path: '',
    component: LogSearchDsTsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LogSearchDsTsDetailComponent,
    resolve: {
      logSearchDsTs: LogSearchDsTsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogSearchDsTsUpdateComponent,
    resolve: {
      logSearchDsTs: LogSearchDsTsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LogSearchDsTsUpdateComponent,
    resolve: {
      logSearchDsTs: LogSearchDsTsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default logSearchDsTsRoute;
