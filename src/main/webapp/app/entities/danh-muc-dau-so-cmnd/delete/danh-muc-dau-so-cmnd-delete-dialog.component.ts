import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucDauSoCmnd } from '../danh-muc-dau-so-cmnd.model';
import { DanhMucDauSoCmndService } from '../service/danh-muc-dau-so-cmnd.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-dau-so-cmnd-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucDauSoCmndDeleteDialogComponent {
  danhMucDauSoCmnd?: IDanhMucDauSoCmnd;

  protected danhMucDauSoCmndService = inject(DanhMucDauSoCmndService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucDauSoCmndService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
