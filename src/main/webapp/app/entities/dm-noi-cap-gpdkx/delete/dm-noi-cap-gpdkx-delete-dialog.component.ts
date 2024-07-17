import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDmNoiCapGpdkx } from '../dm-noi-cap-gpdkx.model';
import { DmNoiCapGpdkxService } from '../service/dm-noi-cap-gpdkx.service';

@Component({
  standalone: true,
  templateUrl: './dm-noi-cap-gpdkx-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DmNoiCapGpdkxDeleteDialogComponent {
  dmNoiCapGpdkx?: IDmNoiCapGpdkx;

  protected dmNoiCapGpdkxService = inject(DmNoiCapGpdkxService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dmNoiCapGpdkxService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
