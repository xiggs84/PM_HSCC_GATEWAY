import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CauHinhMauHopDongComponent } from './list/cau-hinh-mau-hop-dong.component';
import { CauHinhMauHopDongDetailComponent } from './detail/cau-hinh-mau-hop-dong-detail.component';
import { CauHinhMauHopDongUpdateComponent } from './update/cau-hinh-mau-hop-dong-update.component';
import CauHinhMauHopDongResolve from './route/cau-hinh-mau-hop-dong-routing-resolve.service';

const cauHinhMauHopDongRoute: Routes = [
  {
    path: '',
    component: CauHinhMauHopDongComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CauHinhMauHopDongDetailComponent,
    resolve: {
      cauHinhMauHopDong: CauHinhMauHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CauHinhMauHopDongUpdateComponent,
    resolve: {
      cauHinhMauHopDong: CauHinhMauHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CauHinhMauHopDongUpdateComponent,
    resolve: {
      cauHinhMauHopDong: CauHinhMauHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cauHinhMauHopDongRoute;
