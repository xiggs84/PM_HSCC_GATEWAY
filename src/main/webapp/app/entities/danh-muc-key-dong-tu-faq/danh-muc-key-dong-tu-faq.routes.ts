import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucKeyDongTuFaqComponent } from './list/danh-muc-key-dong-tu-faq.component';
import { DanhMucKeyDongTuFaqDetailComponent } from './detail/danh-muc-key-dong-tu-faq-detail.component';
import { DanhMucKeyDongTuFaqUpdateComponent } from './update/danh-muc-key-dong-tu-faq-update.component';
import DanhMucKeyDongTuFaqResolve from './route/danh-muc-key-dong-tu-faq-routing-resolve.service';

const danhMucKeyDongTuFaqRoute: Routes = [
  {
    path: '',
    component: DanhMucKeyDongTuFaqComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucKeyDongTuFaqDetailComponent,
    resolve: {
      danhMucKeyDongTuFaq: DanhMucKeyDongTuFaqResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucKeyDongTuFaqUpdateComponent,
    resolve: {
      danhMucKeyDongTuFaq: DanhMucKeyDongTuFaqResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucKeyDongTuFaqUpdateComponent,
    resolve: {
      danhMucKeyDongTuFaq: DanhMucKeyDongTuFaqResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucKeyDongTuFaqRoute;
