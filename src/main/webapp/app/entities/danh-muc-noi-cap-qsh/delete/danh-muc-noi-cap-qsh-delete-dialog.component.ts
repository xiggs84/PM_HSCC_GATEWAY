import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucNoiCapQsh } from '../danh-muc-noi-cap-qsh.model';
import { DanhMucNoiCapQshService } from '../service/danh-muc-noi-cap-qsh.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-noi-cap-qsh-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucNoiCapQshDeleteDialogComponent {
  danhMucNoiCapQsh?: IDanhMucNoiCapQsh;

  protected danhMucNoiCapQshService = inject(DanhMucNoiCapQshService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucNoiCapQshService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
