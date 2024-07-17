import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { QuyenComponent } from './list/quyen.component';
import { QuyenDetailComponent } from './detail/quyen-detail.component';
import { QuyenUpdateComponent } from './update/quyen-update.component';
import QuyenResolve from './route/quyen-routing-resolve.service';

const quyenRoute: Routes = [
  {
    path: '',
    component: QuyenComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuyenDetailComponent,
    resolve: {
      quyen: QuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuyenUpdateComponent,
    resolve: {
      quyen: QuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuyenUpdateComponent,
    resolve: {
      quyen: QuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quyenRoute;
