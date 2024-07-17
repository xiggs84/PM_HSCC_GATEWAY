import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucNgoaiTeComponent } from './list/danh-muc-ngoai-te.component';
import { DanhMucNgoaiTeDetailComponent } from './detail/danh-muc-ngoai-te-detail.component';
import { DanhMucNgoaiTeUpdateComponent } from './update/danh-muc-ngoai-te-update.component';
import DanhMucNgoaiTeResolve from './route/danh-muc-ngoai-te-routing-resolve.service';

const danhMucNgoaiTeRoute: Routes = [
  {
    path: '',
    component: DanhMucNgoaiTeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucNgoaiTeDetailComponent,
    resolve: {
      danhMucNgoaiTe: DanhMucNgoaiTeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucNgoaiTeUpdateComponent,
    resolve: {
      danhMucNgoaiTe: DanhMucNgoaiTeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucNgoaiTeUpdateComponent,
    resolve: {
      danhMucNgoaiTe: DanhMucNgoaiTeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucNgoaiTeRoute;
