import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucFileUploadKysoComponent } from './list/danh-muc-file-upload-kyso.component';
import { DanhMucFileUploadKysoDetailComponent } from './detail/danh-muc-file-upload-kyso-detail.component';
import { DanhMucFileUploadKysoUpdateComponent } from './update/danh-muc-file-upload-kyso-update.component';
import DanhMucFileUploadKysoResolve from './route/danh-muc-file-upload-kyso-routing-resolve.service';

const danhMucFileUploadKysoRoute: Routes = [
  {
    path: '',
    component: DanhMucFileUploadKysoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucFileUploadKysoDetailComponent,
    resolve: {
      danhMucFileUploadKyso: DanhMucFileUploadKysoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucFileUploadKysoUpdateComponent,
    resolve: {
      danhMucFileUploadKyso: DanhMucFileUploadKysoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucFileUploadKysoUpdateComponent,
    resolve: {
      danhMucFileUploadKyso: DanhMucFileUploadKysoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucFileUploadKysoRoute;
