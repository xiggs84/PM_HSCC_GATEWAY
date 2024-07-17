import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucFileUploadKyso } from '../danh-muc-file-upload-kyso.model';
import { DanhMucFileUploadKysoService } from '../service/danh-muc-file-upload-kyso.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-file-upload-kyso-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucFileUploadKysoDeleteDialogComponent {
  danhMucFileUploadKyso?: IDanhMucFileUploadKyso;

  protected danhMucFileUploadKysoService = inject(DanhMucFileUploadKysoService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucFileUploadKysoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
