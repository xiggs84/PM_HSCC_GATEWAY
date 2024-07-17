import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucVaiTro } from '../danh-muc-vai-tro.model';
import { DanhMucVaiTroService } from '../service/danh-muc-vai-tro.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-vai-tro-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucVaiTroDeleteDialogComponent {
  danhMucVaiTro?: IDanhMucVaiTro;

  protected danhMucVaiTroService = inject(DanhMucVaiTroService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucVaiTroService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
