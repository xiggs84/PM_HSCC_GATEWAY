import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucCapQuanLyComponent } from './list/danh-muc-cap-quan-ly.component';
import { DanhMucCapQuanLyDetailComponent } from './detail/danh-muc-cap-quan-ly-detail.component';
import { DanhMucCapQuanLyUpdateComponent } from './update/danh-muc-cap-quan-ly-update.component';
import DanhMucCapQuanLyResolve from './route/danh-muc-cap-quan-ly-routing-resolve.service';

const danhMucCapQuanLyRoute: Routes = [
  {
    path: '',
    component: DanhMucCapQuanLyComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucCapQuanLyDetailComponent,
    resolve: {
      danhMucCapQuanLy: DanhMucCapQuanLyResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucCapQuanLyUpdateComponent,
    resolve: {
      danhMucCapQuanLy: DanhMucCapQuanLyResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucCapQuanLyUpdateComponent,
    resolve: {
      danhMucCapQuanLy: DanhMucCapQuanLyResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucCapQuanLyRoute;
