import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { QuanHeDuongSuComponent } from './list/quan-he-duong-su.component';
import { QuanHeDuongSuDetailComponent } from './detail/quan-he-duong-su-detail.component';
import { QuanHeDuongSuUpdateComponent } from './update/quan-he-duong-su-update.component';
import QuanHeDuongSuResolve from './route/quan-he-duong-su-routing-resolve.service';

const quanHeDuongSuRoute: Routes = [
  {
    path: '',
    component: QuanHeDuongSuComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuanHeDuongSuDetailComponent,
    resolve: {
      quanHeDuongSu: QuanHeDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuanHeDuongSuUpdateComponent,
    resolve: {
      quanHeDuongSu: QuanHeDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuanHeDuongSuUpdateComponent,
    resolve: {
      quanHeDuongSu: QuanHeDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quanHeDuongSuRoute;
