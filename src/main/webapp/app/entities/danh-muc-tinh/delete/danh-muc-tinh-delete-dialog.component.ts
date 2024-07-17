import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucTinh } from '../danh-muc-tinh.model';
import { DanhMucTinhService } from '../service/danh-muc-tinh.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-tinh-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucTinhDeleteDialogComponent {
  danhMucTinh?: IDanhMucTinh;

  protected danhMucTinhService = inject(DanhMucTinhService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucTinhService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
