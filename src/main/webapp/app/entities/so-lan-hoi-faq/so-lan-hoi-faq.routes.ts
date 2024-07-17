import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { SoLanHoiFaqComponent } from './list/so-lan-hoi-faq.component';
import { SoLanHoiFaqDetailComponent } from './detail/so-lan-hoi-faq-detail.component';
import { SoLanHoiFaqUpdateComponent } from './update/so-lan-hoi-faq-update.component';
import SoLanHoiFaqResolve from './route/so-lan-hoi-faq-routing-resolve.service';

const soLanHoiFaqRoute: Routes = [
  {
    path: '',
    component: SoLanHoiFaqComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SoLanHoiFaqDetailComponent,
    resolve: {
      soLanHoiFaq: SoLanHoiFaqResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SoLanHoiFaqUpdateComponent,
    resolve: {
      soLanHoiFaq: SoLanHoiFaqResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SoLanHoiFaqUpdateComponent,
    resolve: {
      soLanHoiFaq: SoLanHoiFaqResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default soLanHoiFaqRoute;
