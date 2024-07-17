import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { LoaiHopDongCongChungComponent } from './list/loai-hop-dong-cong-chung.component';
import { LoaiHopDongCongChungDetailComponent } from './detail/loai-hop-dong-cong-chung-detail.component';
import { LoaiHopDongCongChungUpdateComponent } from './update/loai-hop-dong-cong-chung-update.component';
import LoaiHopDongCongChungResolve from './route/loai-hop-dong-cong-chung-routing-resolve.service';

const loaiHopDongCongChungRoute: Routes = [
  {
    path: '',
    component: LoaiHopDongCongChungComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LoaiHopDongCongChungDetailComponent,
    resolve: {
      loaiHopDongCongChung: LoaiHopDongCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LoaiHopDongCongChungUpdateComponent,
    resolve: {
      loaiHopDongCongChung: LoaiHopDongCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LoaiHopDongCongChungUpdateComponent,
    resolve: {
      loaiHopDongCongChung: LoaiHopDongCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default loaiHopDongCongChungRoute;
