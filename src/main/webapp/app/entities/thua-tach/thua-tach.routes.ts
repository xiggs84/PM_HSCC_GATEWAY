import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ThuaTachComponent } from './list/thua-tach.component';
import { ThuaTachDetailComponent } from './detail/thua-tach-detail.component';
import { ThuaTachUpdateComponent } from './update/thua-tach-update.component';
import ThuaTachResolve from './route/thua-tach-routing-resolve.service';

const thuaTachRoute: Routes = [
  {
    path: '',
    component: ThuaTachComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ThuaTachDetailComponent,
    resolve: {
      thuaTach: ThuaTachResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ThuaTachUpdateComponent,
    resolve: {
      thuaTach: ThuaTachResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ThuaTachUpdateComponent,
    resolve: {
      thuaTach: ThuaTachResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default thuaTachRoute;
