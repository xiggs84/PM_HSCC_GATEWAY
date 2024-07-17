import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILogDownloadFileDrive } from '../log-download-file-drive.model';
import { LogDownloadFileDriveService } from '../service/log-download-file-drive.service';

@Component({
  standalone: true,
  templateUrl: './log-download-file-drive-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LogDownloadFileDriveDeleteDialogComponent {
  logDownloadFileDrive?: ILogDownloadFileDrive;

  protected logDownloadFileDriveService = inject(LogDownloadFileDriveService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.logDownloadFileDriveService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
