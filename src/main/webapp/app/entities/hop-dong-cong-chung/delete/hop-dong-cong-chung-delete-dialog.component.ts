import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IHopDongCongChung } from '../hop-dong-cong-chung.model';
import { HopDongCongChungService } from '../service/hop-dong-cong-chung.service';

@Component({
  standalone: true,
  templateUrl: './hop-dong-cong-chung-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class HopDongCongChungDeleteDialogComponent {
  hopDongCongChung?: IHopDongCongChung;

  protected hopDongCongChungService = inject(HopDongCongChungService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.hopDongCongChungService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
