import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucKeyDanhTuFaqComponent } from './list/danh-muc-key-danh-tu-faq.component';
import { DanhMucKeyDanhTuFaqDetailComponent } from './detail/danh-muc-key-danh-tu-faq-detail.component';
import { DanhMucKeyDanhTuFaqUpdateComponent } from './update/danh-muc-key-danh-tu-faq-update.component';
import DanhMucKeyDanhTuFaqResolve from './route/danh-muc-key-danh-tu-faq-routing-resolve.service';

const danhMucKeyDanhTuFaqRoute: Routes = [
  {
    path: '',
    component: DanhMucKeyDanhTuFaqComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucKeyDanhTuFaqDetailComponent,
    resolve: {
      danhMucKeyDanhTuFaq: DanhMucKeyDanhTuFaqResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucKeyDanhTuFaqUpdateComponent,
    resolve: {
      danhMucKeyDanhTuFaq: DanhMucKeyDanhTuFaqResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucKeyDanhTuFaqUpdateComponent,
    resolve: {
      danhMucKeyDanhTuFaq: DanhMucKeyDanhTuFaqResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucKeyDanhTuFaqRoute;
