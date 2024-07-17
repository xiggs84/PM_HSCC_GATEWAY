import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { FileidDriveComponent } from './list/fileid-drive.component';
import { FileidDriveDetailComponent } from './detail/fileid-drive-detail.component';
import { FileidDriveUpdateComponent } from './update/fileid-drive-update.component';
import FileidDriveResolve from './route/fileid-drive-routing-resolve.service';

const fileidDriveRoute: Routes = [
  {
    path: '',
    component: FileidDriveComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FileidDriveDetailComponent,
    resolve: {
      fileidDrive: FileidDriveResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FileidDriveUpdateComponent,
    resolve: {
      fileidDrive: FileidDriveResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FileidDriveUpdateComponent,
    resolve: {
      fileidDrive: FileidDriveResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default fileidDriveRoute;
