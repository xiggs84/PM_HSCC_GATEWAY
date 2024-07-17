import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucHuyen } from '../danh-muc-huyen.model';
import { DanhMucHuyenService } from '../service/danh-muc-huyen.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-huyen-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucHuyenDeleteDialogComponent {
  danhMucHuyen?: IDanhMucHuyen;

  protected danhMucHuyenService = inject(DanhMucHuyenService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucHuyenService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
