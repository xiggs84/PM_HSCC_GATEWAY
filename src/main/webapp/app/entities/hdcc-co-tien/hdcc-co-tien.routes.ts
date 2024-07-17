import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { HdccCoTienComponent } from './list/hdcc-co-tien.component';
import { HdccCoTienDetailComponent } from './detail/hdcc-co-tien-detail.component';
import { HdccCoTienUpdateComponent } from './update/hdcc-co-tien-update.component';
import HdccCoTienResolve from './route/hdcc-co-tien-routing-resolve.service';

const hdccCoTienRoute: Routes = [
  {
    path: '',
    component: HdccCoTienComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HdccCoTienDetailComponent,
    resolve: {
      hdccCoTien: HdccCoTienResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HdccCoTienUpdateComponent,
    resolve: {
      hdccCoTien: HdccCoTienResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HdccCoTienUpdateComponent,
    resolve: {
      hdccCoTien: HdccCoTienResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default hdccCoTienRoute;
