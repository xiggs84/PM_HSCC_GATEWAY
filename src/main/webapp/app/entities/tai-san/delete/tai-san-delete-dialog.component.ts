import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITaiSan } from '../tai-san.model';
import { TaiSanService } from '../service/tai-san.service';

@Component({
  standalone: true,
  templateUrl: './tai-san-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TaiSanDeleteDialogComponent {
  taiSan?: ITaiSan;

  protected taiSanService = inject(TaiSanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taiSanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
