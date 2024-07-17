import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucCanBo } from '../danh-muc-can-bo.model';
import { DanhMucCanBoService } from '../service/danh-muc-can-bo.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-can-bo-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucCanBoDeleteDialogComponent {
  danhMucCanBo?: IDanhMucCanBo;

  protected danhMucCanBoService = inject(DanhMucCanBoService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucCanBoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
