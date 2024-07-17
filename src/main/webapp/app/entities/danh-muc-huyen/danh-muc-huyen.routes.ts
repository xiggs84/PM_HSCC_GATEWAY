import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucHuyenComponent } from './list/danh-muc-huyen.component';
import { DanhMucHuyenDetailComponent } from './detail/danh-muc-huyen-detail.component';
import { DanhMucHuyenUpdateComponent } from './update/danh-muc-huyen-update.component';
import DanhMucHuyenResolve from './route/danh-muc-huyen-routing-resolve.service';

const danhMucHuyenRoute: Routes = [
  {
    path: '',
    component: DanhMucHuyenComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucHuyenDetailComponent,
    resolve: {
      danhMucHuyen: DanhMucHuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucHuyenUpdateComponent,
    resolve: {
      danhMucHuyen: DanhMucHuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucHuyenUpdateComponent,
    resolve: {
      danhMucHuyen: DanhMucHuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucHuyenRoute;
