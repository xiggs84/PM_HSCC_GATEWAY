import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITaiSanDgc } from '../tai-san-dgc.model';
import { TaiSanDgcService } from '../service/tai-san-dgc.service';

@Component({
  standalone: true,
  templateUrl: './tai-san-dgc-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TaiSanDgcDeleteDialogComponent {
  taiSanDgc?: ITaiSanDgc;

  protected taiSanDgcService = inject(TaiSanDgcService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taiSanDgcService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
