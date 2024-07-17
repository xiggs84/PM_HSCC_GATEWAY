import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDuongSuTrungCmnd } from '../duong-su-trung-cmnd.model';
import { DuongSuTrungCmndService } from '../service/duong-su-trung-cmnd.service';

@Component({
  standalone: true,
  templateUrl: './duong-su-trung-cmnd-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DuongSuTrungCmndDeleteDialogComponent {
  duongSuTrungCmnd?: IDuongSuTrungCmnd;

  protected duongSuTrungCmndService = inject(DuongSuTrungCmndService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.duongSuTrungCmndService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
