import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucLoaiDonVi } from '../danh-muc-loai-don-vi.model';
import { DanhMucLoaiDonViService } from '../service/danh-muc-loai-don-vi.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-loai-don-vi-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucLoaiDonViDeleteDialogComponent {
  danhMucLoaiDonVi?: IDanhMucLoaiDonVi;

  protected danhMucLoaiDonViService = inject(DanhMucLoaiDonViService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucLoaiDonViService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
