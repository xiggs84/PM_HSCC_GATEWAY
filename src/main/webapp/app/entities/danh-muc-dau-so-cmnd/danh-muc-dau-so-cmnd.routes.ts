import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucDauSoCmndComponent } from './list/danh-muc-dau-so-cmnd.component';
import { DanhMucDauSoCmndDetailComponent } from './detail/danh-muc-dau-so-cmnd-detail.component';
import { DanhMucDauSoCmndUpdateComponent } from './update/danh-muc-dau-so-cmnd-update.component';
import DanhMucDauSoCmndResolve from './route/danh-muc-dau-so-cmnd-routing-resolve.service';

const danhMucDauSoCmndRoute: Routes = [
  {
    path: '',
    component: DanhMucDauSoCmndComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucDauSoCmndDetailComponent,
    resolve: {
      danhMucDauSoCmnd: DanhMucDauSoCmndResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucDauSoCmndUpdateComponent,
    resolve: {
      danhMucDauSoCmnd: DanhMucDauSoCmndResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucDauSoCmndUpdateComponent,
    resolve: {
      danhMucDauSoCmnd: DanhMucDauSoCmndResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucDauSoCmndRoute;
