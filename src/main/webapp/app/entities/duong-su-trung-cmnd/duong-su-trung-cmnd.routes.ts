import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DuongSuTrungCmndComponent } from './list/duong-su-trung-cmnd.component';
import { DuongSuTrungCmndDetailComponent } from './detail/duong-su-trung-cmnd-detail.component';
import { DuongSuTrungCmndUpdateComponent } from './update/duong-su-trung-cmnd-update.component';
import DuongSuTrungCmndResolve from './route/duong-su-trung-cmnd-routing-resolve.service';

const duongSuTrungCmndRoute: Routes = [
  {
    path: '',
    component: DuongSuTrungCmndComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DuongSuTrungCmndDetailComponent,
    resolve: {
      duongSuTrungCmnd: DuongSuTrungCmndResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DuongSuTrungCmndUpdateComponent,
    resolve: {
      duongSuTrungCmnd: DuongSuTrungCmndResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DuongSuTrungCmndUpdateComponent,
    resolve: {
      duongSuTrungCmnd: DuongSuTrungCmndResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default duongSuTrungCmndRoute;
