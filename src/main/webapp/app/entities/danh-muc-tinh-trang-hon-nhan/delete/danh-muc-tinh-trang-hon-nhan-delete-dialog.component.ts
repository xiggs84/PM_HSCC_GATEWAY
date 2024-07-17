import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucTinhTrangHonNhan } from '../danh-muc-tinh-trang-hon-nhan.model';
import { DanhMucTinhTrangHonNhanService } from '../service/danh-muc-tinh-trang-hon-nhan.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-tinh-trang-hon-nhan-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucTinhTrangHonNhanDeleteDialogComponent {
  danhMucTinhTrangHonNhan?: IDanhMucTinhTrangHonNhan;

  protected danhMucTinhTrangHonNhanService = inject(DanhMucTinhTrangHonNhanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucTinhTrangHonNhanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
