import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ThongTinChungHopDongComponent } from './list/thong-tin-chung-hop-dong.component';
import { ThongTinChungHopDongDetailComponent } from './detail/thong-tin-chung-hop-dong-detail.component';
import { ThongTinChungHopDongUpdateComponent } from './update/thong-tin-chung-hop-dong-update.component';
import ThongTinChungHopDongResolve from './route/thong-tin-chung-hop-dong-routing-resolve.service';

const thongTinChungHopDongRoute: Routes = [
  {
    path: '',
    component: ThongTinChungHopDongComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ThongTinChungHopDongDetailComponent,
    resolve: {
      thongTinChungHopDong: ThongTinChungHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ThongTinChungHopDongUpdateComponent,
    resolve: {
      thongTinChungHopDong: ThongTinChungHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ThongTinChungHopDongUpdateComponent,
    resolve: {
      thongTinChungHopDong: ThongTinChungHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default thongTinChungHopDongRoute;
