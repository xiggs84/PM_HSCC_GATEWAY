import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucTheHtmlComponent } from './list/danh-muc-the-html.component';
import { DanhMucTheHtmlDetailComponent } from './detail/danh-muc-the-html-detail.component';
import { DanhMucTheHtmlUpdateComponent } from './update/danh-muc-the-html-update.component';
import DanhMucTheHtmlResolve from './route/danh-muc-the-html-routing-resolve.service';

const danhMucTheHtmlRoute: Routes = [
  {
    path: '',
    component: DanhMucTheHtmlComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucTheHtmlDetailComponent,
    resolve: {
      danhMucTheHtml: DanhMucTheHtmlResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucTheHtmlUpdateComponent,
    resolve: {
      danhMucTheHtml: DanhMucTheHtmlResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucTheHtmlUpdateComponent,
    resolve: {
      danhMucTheHtml: DanhMucTheHtmlResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucTheHtmlRoute;
