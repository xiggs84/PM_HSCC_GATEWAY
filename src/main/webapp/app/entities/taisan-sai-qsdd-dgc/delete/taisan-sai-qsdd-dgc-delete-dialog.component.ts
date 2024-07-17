import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITaisanSaiQsddDgc } from '../taisan-sai-qsdd-dgc.model';
import { TaisanSaiQsddDgcService } from '../service/taisan-sai-qsdd-dgc.service';

@Component({
  standalone: true,
  templateUrl: './taisan-sai-qsdd-dgc-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TaisanSaiQsddDgcDeleteDialogComponent {
  taisanSaiQsddDgc?: ITaisanSaiQsddDgc;

  protected taisanSaiQsddDgcService = inject(TaisanSaiQsddDgcService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taisanSaiQsddDgcService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
