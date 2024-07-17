import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IThuaTach } from '../thua-tach.model';
import { ThuaTachService } from '../service/thua-tach.service';

@Component({
  standalone: true,
  templateUrl: './thua-tach-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ThuaTachDeleteDialogComponent {
  thuaTach?: IThuaTach;

  protected thuaTachService = inject(ThuaTachService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.thuaTachService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
