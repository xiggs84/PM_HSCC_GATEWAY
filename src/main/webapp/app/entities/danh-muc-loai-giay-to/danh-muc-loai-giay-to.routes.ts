import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucLoaiGiayToComponent } from './list/danh-muc-loai-giay-to.component';
import { DanhMucLoaiGiayToDetailComponent } from './detail/danh-muc-loai-giay-to-detail.component';
import { DanhMucLoaiGiayToUpdateComponent } from './update/danh-muc-loai-giay-to-update.component';
import DanhMucLoaiGiayToResolve from './route/danh-muc-loai-giay-to-routing-resolve.service';

const danhMucLoaiGiayToRoute: Routes = [
  {
    path: '',
    component: DanhMucLoaiGiayToComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucLoaiGiayToDetailComponent,
    resolve: {
      danhMucLoaiGiayTo: DanhMucLoaiGiayToResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucLoaiGiayToUpdateComponent,
    resolve: {
      danhMucLoaiGiayTo: DanhMucLoaiGiayToResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucLoaiGiayToUpdateComponent,
    resolve: {
      danhMucLoaiGiayTo: DanhMucLoaiGiayToResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucLoaiGiayToRoute;
