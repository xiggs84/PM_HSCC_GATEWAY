import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITaiSanDatNha } from '../tai-san-dat-nha.model';
import { TaiSanDatNhaService } from '../service/tai-san-dat-nha.service';

@Component({
  standalone: true,
  templateUrl: './tai-san-dat-nha-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TaiSanDatNhaDeleteDialogComponent {
  taiSanDatNha?: ITaiSanDatNha;

  protected taiSanDatNhaService = inject(TaiSanDatNhaService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taiSanDatNhaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
