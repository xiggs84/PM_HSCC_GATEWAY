import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucNgonNgu } from '../danh-muc-ngon-ngu.model';
import { DanhMucNgonNguService } from '../service/danh-muc-ngon-ngu.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-ngon-ngu-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucNgonNguDeleteDialogComponent {
  danhMucNgonNgu?: IDanhMucNgonNgu;

  protected danhMucNgonNguService = inject(DanhMucNgonNguService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucNgonNguService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
