import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { LogDownloadFileDriveComponent } from './list/log-download-file-drive.component';
import { LogDownloadFileDriveDetailComponent } from './detail/log-download-file-drive-detail.component';
import { LogDownloadFileDriveUpdateComponent } from './update/log-download-file-drive-update.component';
import LogDownloadFileDriveResolve from './route/log-download-file-drive-routing-resolve.service';

const logDownloadFileDriveRoute: Routes = [
  {
    path: '',
    component: LogDownloadFileDriveComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LogDownloadFileDriveDetailComponent,
    resolve: {
      logDownloadFileDrive: LogDownloadFileDriveResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogDownloadFileDriveUpdateComponent,
    resolve: {
      logDownloadFileDrive: LogDownloadFileDriveResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LogDownloadFileDriveUpdateComponent,
    resolve: {
      logDownloadFileDrive: LogDownloadFileDriveResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default logDownloadFileDriveRoute;
