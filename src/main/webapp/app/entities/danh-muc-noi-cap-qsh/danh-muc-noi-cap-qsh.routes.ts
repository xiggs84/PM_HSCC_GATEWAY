import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucNoiCapQshComponent } from './list/danh-muc-noi-cap-qsh.component';
import { DanhMucNoiCapQshDetailComponent } from './detail/danh-muc-noi-cap-qsh-detail.component';
import { DanhMucNoiCapQshUpdateComponent } from './update/danh-muc-noi-cap-qsh-update.component';
import DanhMucNoiCapQshResolve from './route/danh-muc-noi-cap-qsh-routing-resolve.service';

const danhMucNoiCapQshRoute: Routes = [
  {
    path: '',
    component: DanhMucNoiCapQshComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucNoiCapQshDetailComponent,
    resolve: {
      danhMucNoiCapQsh: DanhMucNoiCapQshResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucNoiCapQshUpdateComponent,
    resolve: {
      danhMucNoiCapQsh: DanhMucNoiCapQshResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucNoiCapQshUpdateComponent,
    resolve: {
      danhMucNoiCapQsh: DanhMucNoiCapQshResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucNoiCapQshRoute;
