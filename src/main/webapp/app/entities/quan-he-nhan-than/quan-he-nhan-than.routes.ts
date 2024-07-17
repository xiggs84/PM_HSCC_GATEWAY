import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { QuanHeNhanThanComponent } from './list/quan-he-nhan-than.component';
import { QuanHeNhanThanDetailComponent } from './detail/quan-he-nhan-than-detail.component';
import { QuanHeNhanThanUpdateComponent } from './update/quan-he-nhan-than-update.component';
import QuanHeNhanThanResolve from './route/quan-he-nhan-than-routing-resolve.service';

const quanHeNhanThanRoute: Routes = [
  {
    path: '',
    component: QuanHeNhanThanComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuanHeNhanThanDetailComponent,
    resolve: {
      quanHeNhanThan: QuanHeNhanThanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuanHeNhanThanUpdateComponent,
    resolve: {
      quanHeNhanThan: QuanHeNhanThanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuanHeNhanThanUpdateComponent,
    resolve: {
      quanHeNhanThan: QuanHeNhanThanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quanHeNhanThanRoute;
