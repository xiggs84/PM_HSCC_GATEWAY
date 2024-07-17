import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IVanBan } from '../van-ban.model';
import { VanBanService } from '../service/van-ban.service';

@Component({
  standalone: true,
  templateUrl: './van-ban-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class VanBanDeleteDialogComponent {
  vanBan?: IVanBan;

  protected vanBanService = inject(VanBanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vanBanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
