import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhsachDsNganchanTmpComponent } from './list/danhsach-ds-nganchan-tmp.component';
import { DanhsachDsNganchanTmpDetailComponent } from './detail/danhsach-ds-nganchan-tmp-detail.component';
import { DanhsachDsNganchanTmpUpdateComponent } from './update/danhsach-ds-nganchan-tmp-update.component';
import DanhsachDsNganchanTmpResolve from './route/danhsach-ds-nganchan-tmp-routing-resolve.service';

const danhsachDsNganchanTmpRoute: Routes = [
  {
    path: '',
    component: DanhsachDsNganchanTmpComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhsachDsNganchanTmpDetailComponent,
    resolve: {
      danhsachDsNganchanTmp: DanhsachDsNganchanTmpResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhsachDsNganchanTmpUpdateComponent,
    resolve: {
      danhsachDsNganchanTmp: DanhsachDsNganchanTmpResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhsachDsNganchanTmpUpdateComponent,
    resolve: {
      danhsachDsNganchanTmp: DanhsachDsNganchanTmpResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhsachDsNganchanTmpRoute;
