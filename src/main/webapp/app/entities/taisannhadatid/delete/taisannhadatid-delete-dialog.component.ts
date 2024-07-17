import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITaisannhadatid } from '../taisannhadatid.model';
import { TaisannhadatidService } from '../service/taisannhadatid.service';

@Component({
  standalone: true,
  templateUrl: './taisannhadatid-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TaisannhadatidDeleteDialogComponent {
  taisannhadatid?: ITaisannhadatid;

  protected taisannhadatidService = inject(TaisannhadatidService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taisannhadatidService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
