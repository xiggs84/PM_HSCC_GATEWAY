import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CauHinhHoaDonDienTuComponent } from './list/cau-hinh-hoa-don-dien-tu.component';
import { CauHinhHoaDonDienTuDetailComponent } from './detail/cau-hinh-hoa-don-dien-tu-detail.component';
import { CauHinhHoaDonDienTuUpdateComponent } from './update/cau-hinh-hoa-don-dien-tu-update.component';
import CauHinhHoaDonDienTuResolve from './route/cau-hinh-hoa-don-dien-tu-routing-resolve.service';

const cauHinhHoaDonDienTuRoute: Routes = [
  {
    path: '',
    component: CauHinhHoaDonDienTuComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CauHinhHoaDonDienTuDetailComponent,
    resolve: {
      cauHinhHoaDonDienTu: CauHinhHoaDonDienTuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CauHinhHoaDonDienTuUpdateComponent,
    resolve: {
      cauHinhHoaDonDienTu: CauHinhHoaDonDienTuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CauHinhHoaDonDienTuUpdateComponent,
    resolve: {
      cauHinhHoaDonDienTu: CauHinhHoaDonDienTuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cauHinhHoaDonDienTuRoute;
