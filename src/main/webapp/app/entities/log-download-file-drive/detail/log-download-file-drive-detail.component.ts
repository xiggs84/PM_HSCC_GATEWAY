import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ILogDownloadFileDrive } from '../log-download-file-drive.model';

@Component({
  standalone: true,
  selector: 'jhi-log-download-file-drive-detail',
  templateUrl: './log-download-file-drive-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class LogDownloadFileDriveDetailComponent {
  logDownloadFileDrive = input<ILogDownloadFileDrive | null>(null);

  previousState(): void {
    window.history.back();
  }
}
