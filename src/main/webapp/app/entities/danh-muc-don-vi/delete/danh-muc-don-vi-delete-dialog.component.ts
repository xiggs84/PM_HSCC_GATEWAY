import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucDonVi } from '../danh-muc-don-vi.model';
import { DanhMucDonViService } from '../service/danh-muc-don-vi.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-don-vi-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucDonViDeleteDialogComponent {
  danhMucDonVi?: IDanhMucDonVi;

  protected danhMucDonViService = inject(DanhMucDonViService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucDonViService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
