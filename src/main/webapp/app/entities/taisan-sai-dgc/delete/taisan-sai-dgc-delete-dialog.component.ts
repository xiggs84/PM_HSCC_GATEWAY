import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITaisanSaiDgc } from '../taisan-sai-dgc.model';
import { TaisanSaiDgcService } from '../service/taisan-sai-dgc.service';

@Component({
  standalone: true,
  templateUrl: './taisan-sai-dgc-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TaisanSaiDgcDeleteDialogComponent {
  taisanSaiDgc?: ITaisanSaiDgc;

  protected taisanSaiDgcService = inject(TaisanSaiDgcService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taisanSaiDgcService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
