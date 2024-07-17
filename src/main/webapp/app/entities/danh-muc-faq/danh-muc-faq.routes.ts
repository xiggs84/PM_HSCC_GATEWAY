import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucFaqComponent } from './list/danh-muc-faq.component';
import { DanhMucFaqDetailComponent } from './detail/danh-muc-faq-detail.component';
import { DanhMucFaqUpdateComponent } from './update/danh-muc-faq-update.component';
import DanhMucFaqResolve from './route/danh-muc-faq-routing-resolve.service';

const danhMucFaqRoute: Routes = [
  {
    path: '',
    component: DanhMucFaqComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucFaqDetailComponent,
    resolve: {
      danhMucFaq: DanhMucFaqResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucFaqUpdateComponent,
    resolve: {
      danhMucFaq: DanhMucFaqResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucFaqUpdateComponent,
    resolve: {
      danhMucFaq: DanhMucFaqResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucFaqRoute;
