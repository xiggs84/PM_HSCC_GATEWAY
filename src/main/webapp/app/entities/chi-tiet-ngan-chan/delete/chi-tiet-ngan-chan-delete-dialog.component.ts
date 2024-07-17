import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IChiTietNganChan } from '../chi-tiet-ngan-chan.model';
import { ChiTietNganChanService } from '../service/chi-tiet-ngan-chan.service';

@Component({
  standalone: true,
  templateUrl: './chi-tiet-ngan-chan-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ChiTietNganChanDeleteDialogComponent {
  chiTietNganChan?: IChiTietNganChan;

  protected chiTietNganChanService = inject(ChiTietNganChanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chiTietNganChanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
