import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucDonViComponent } from './list/danh-muc-don-vi.component';
import { DanhMucDonViDetailComponent } from './detail/danh-muc-don-vi-detail.component';
import { DanhMucDonViUpdateComponent } from './update/danh-muc-don-vi-update.component';
import DanhMucDonViResolve from './route/danh-muc-don-vi-routing-resolve.service';

const danhMucDonViRoute: Routes = [
  {
    path: '',
    component: DanhMucDonViComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucDonViDetailComponent,
    resolve: {
      danhMucDonVi: DanhMucDonViResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucDonViUpdateComponent,
    resolve: {
      danhMucDonVi: DanhMucDonViResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucDonViUpdateComponent,
    resolve: {
      danhMucDonVi: DanhMucDonViResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucDonViRoute;
