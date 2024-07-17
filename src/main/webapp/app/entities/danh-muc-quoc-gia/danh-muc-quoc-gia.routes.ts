import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucQuocGiaComponent } from './list/danh-muc-quoc-gia.component';
import { DanhMucQuocGiaDetailComponent } from './detail/danh-muc-quoc-gia-detail.component';
import { DanhMucQuocGiaUpdateComponent } from './update/danh-muc-quoc-gia-update.component';
import DanhMucQuocGiaResolve from './route/danh-muc-quoc-gia-routing-resolve.service';

const danhMucQuocGiaRoute: Routes = [
  {
    path: '',
    component: DanhMucQuocGiaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucQuocGiaDetailComponent,
    resolve: {
      danhMucQuocGia: DanhMucQuocGiaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucQuocGiaUpdateComponent,
    resolve: {
      danhMucQuocGia: DanhMucQuocGiaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucQuocGiaUpdateComponent,
    resolve: {
      danhMucQuocGia: DanhMucQuocGiaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucQuocGiaRoute;
