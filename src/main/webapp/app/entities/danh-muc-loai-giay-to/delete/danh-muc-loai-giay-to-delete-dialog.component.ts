import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucLoaiGiayTo } from '../danh-muc-loai-giay-to.model';
import { DanhMucLoaiGiayToService } from '../service/danh-muc-loai-giay-to.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-loai-giay-to-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucLoaiGiayToDeleteDialogComponent {
  danhMucLoaiGiayTo?: IDanhMucLoaiGiayTo;

  protected danhMucLoaiGiayToService = inject(DanhMucLoaiGiayToService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucLoaiGiayToService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
