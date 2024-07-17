import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucVaiTroComponent } from './list/danh-muc-vai-tro.component';
import { DanhMucVaiTroDetailComponent } from './detail/danh-muc-vai-tro-detail.component';
import { DanhMucVaiTroUpdateComponent } from './update/danh-muc-vai-tro-update.component';
import DanhMucVaiTroResolve from './route/danh-muc-vai-tro-routing-resolve.service';

const danhMucVaiTroRoute: Routes = [
  {
    path: '',
    component: DanhMucVaiTroComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucVaiTroDetailComponent,
    resolve: {
      danhMucVaiTro: DanhMucVaiTroResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucVaiTroUpdateComponent,
    resolve: {
      danhMucVaiTro: DanhMucVaiTroResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucVaiTroUpdateComponent,
    resolve: {
      danhMucVaiTro: DanhMucVaiTroResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucVaiTroRoute;
