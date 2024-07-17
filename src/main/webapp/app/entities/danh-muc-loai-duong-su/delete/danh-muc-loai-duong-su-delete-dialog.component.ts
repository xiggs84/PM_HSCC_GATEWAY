import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucLoaiDuongSu } from '../danh-muc-loai-duong-su.model';
import { DanhMucLoaiDuongSuService } from '../service/danh-muc-loai-duong-su.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-loai-duong-su-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucLoaiDuongSuDeleteDialogComponent {
  danhMucLoaiDuongSu?: IDanhMucLoaiDuongSu;

  protected danhMucLoaiDuongSuService = inject(DanhMucLoaiDuongSuService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucLoaiDuongSuService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
