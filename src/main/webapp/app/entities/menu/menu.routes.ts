import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { MenuComponent } from './list/menu.component';
import { MenuDetailComponent } from './detail/menu-detail.component';
import { MenuUpdateComponent } from './update/menu-update.component';
import MenuResolve from './route/menu-routing-resolve.service';

const menuRoute: Routes = [
  {
    path: '',
    component: MenuComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MenuDetailComponent,
    resolve: {
      menu: MenuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MenuUpdateComponent,
    resolve: {
      menu: MenuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MenuUpdateComponent,
    resolve: {
      menu: MenuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default menuRoute;
