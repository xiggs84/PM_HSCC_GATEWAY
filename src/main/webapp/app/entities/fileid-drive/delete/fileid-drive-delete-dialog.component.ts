import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFileidDrive } from '../fileid-drive.model';
import { FileidDriveService } from '../service/fileid-drive.service';

@Component({
  standalone: true,
  templateUrl: './fileid-drive-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class FileidDriveDeleteDialogComponent {
  fileidDrive?: IFileidDrive;

  protected fileidDriveService = inject(FileidDriveService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fileidDriveService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
