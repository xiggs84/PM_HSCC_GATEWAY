import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucLoaiSoCongChung } from '../danh-muc-loai-so-cong-chung.model';
import { DanhMucLoaiSoCongChungService } from '../service/danh-muc-loai-so-cong-chung.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-loai-so-cong-chung-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucLoaiSoCongChungDeleteDialogComponent {
  danhMucLoaiSoCongChung?: IDanhMucLoaiSoCongChung;

  protected danhMucLoaiSoCongChungService = inject(DanhMucLoaiSoCongChungService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucLoaiSoCongChungService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
