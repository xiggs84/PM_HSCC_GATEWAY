import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucNgoaiTe } from '../danh-muc-ngoai-te.model';
import { DanhMucNgoaiTeService } from '../service/danh-muc-ngoai-te.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-ngoai-te-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucNgoaiTeDeleteDialogComponent {
  danhMucNgoaiTe?: IDanhMucNgoaiTe;

  protected danhMucNgoaiTeService = inject(DanhMucNgoaiTeService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucNgoaiTeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
