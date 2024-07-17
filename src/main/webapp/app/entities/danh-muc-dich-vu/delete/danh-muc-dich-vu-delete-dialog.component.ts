import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucDichVu } from '../danh-muc-dich-vu.model';
import { DanhMucDichVuService } from '../service/danh-muc-dich-vu.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-dich-vu-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucDichVuDeleteDialogComponent {
  danhMucDichVu?: IDanhMucDichVu;

  protected danhMucDichVuService = inject(DanhMucDichVuService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucDichVuService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
