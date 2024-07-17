import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucTuVietTat } from '../danh-muc-tu-viet-tat.model';
import { DanhMucTuVietTatService } from '../service/danh-muc-tu-viet-tat.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-tu-viet-tat-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucTuVietTatDeleteDialogComponent {
  danhMucTuVietTat?: IDanhMucTuVietTat;

  protected danhMucTuVietTatService = inject(DanhMucTuVietTatService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucTuVietTatService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
