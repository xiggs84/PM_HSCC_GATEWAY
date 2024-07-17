import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { QuanHeMasterComponent } from './list/quan-he-master.component';
import { QuanHeMasterDetailComponent } from './detail/quan-he-master-detail.component';
import { QuanHeMasterUpdateComponent } from './update/quan-he-master-update.component';
import QuanHeMasterResolve from './route/quan-he-master-routing-resolve.service';

const quanHeMasterRoute: Routes = [
  {
    path: '',
    component: QuanHeMasterComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuanHeMasterDetailComponent,
    resolve: {
      quanHeMaster: QuanHeMasterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuanHeMasterUpdateComponent,
    resolve: {
      quanHeMaster: QuanHeMasterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuanHeMasterUpdateComponent,
    resolve: {
      quanHeMaster: QuanHeMasterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quanHeMasterRoute;
