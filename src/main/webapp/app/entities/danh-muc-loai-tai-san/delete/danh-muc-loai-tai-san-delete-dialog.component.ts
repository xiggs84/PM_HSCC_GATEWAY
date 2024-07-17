import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucLoaiTaiSan } from '../danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from '../service/danh-muc-loai-tai-san.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-loai-tai-san-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucLoaiTaiSanDeleteDialogComponent {
  danhMucLoaiTaiSan?: IDanhMucLoaiTaiSan;

  protected danhMucLoaiTaiSanService = inject(DanhMucLoaiTaiSanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucLoaiTaiSanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
