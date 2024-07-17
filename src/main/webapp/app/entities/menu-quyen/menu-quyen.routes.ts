import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { MenuQuyenComponent } from './list/menu-quyen.component';
import { MenuQuyenDetailComponent } from './detail/menu-quyen-detail.component';
import { MenuQuyenUpdateComponent } from './update/menu-quyen-update.component';
import MenuQuyenResolve from './route/menu-quyen-routing-resolve.service';

const menuQuyenRoute: Routes = [
  {
    path: '',
    component: MenuQuyenComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MenuQuyenDetailComponent,
    resolve: {
      menuQuyen: MenuQuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MenuQuyenUpdateComponent,
    resolve: {
      menuQuyen: MenuQuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MenuQuyenUpdateComponent,
    resolve: {
      menuQuyen: MenuQuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default menuQuyenRoute;
