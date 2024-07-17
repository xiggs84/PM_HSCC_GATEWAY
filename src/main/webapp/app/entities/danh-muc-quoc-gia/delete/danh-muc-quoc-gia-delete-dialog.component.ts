import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucQuocGia } from '../danh-muc-quoc-gia.model';
import { DanhMucQuocGiaService } from '../service/danh-muc-quoc-gia.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-quoc-gia-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucQuocGiaDeleteDialogComponent {
  danhMucQuocGia?: IDanhMucQuocGia;

  protected danhMucQuocGiaService = inject(DanhMucQuocGiaService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucQuocGiaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
