import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CauHinhHopDongComponent } from './list/cau-hinh-hop-dong.component';
import { CauHinhHopDongDetailComponent } from './detail/cau-hinh-hop-dong-detail.component';
import { CauHinhHopDongUpdateComponent } from './update/cau-hinh-hop-dong-update.component';
import CauHinhHopDongResolve from './route/cau-hinh-hop-dong-routing-resolve.service';

const cauHinhHopDongRoute: Routes = [
  {
    path: '',
    component: CauHinhHopDongComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CauHinhHopDongDetailComponent,
    resolve: {
      cauHinhHopDong: CauHinhHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CauHinhHopDongUpdateComponent,
    resolve: {
      cauHinhHopDong: CauHinhHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CauHinhHopDongUpdateComponent,
    resolve: {
      cauHinhHopDong: CauHinhHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cauHinhHopDongRoute;
