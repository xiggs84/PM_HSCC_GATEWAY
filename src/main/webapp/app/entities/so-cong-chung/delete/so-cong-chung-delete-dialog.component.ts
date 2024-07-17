import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISoCongChung } from '../so-cong-chung.model';
import { SoCongChungService } from '../service/so-cong-chung.service';

@Component({
  standalone: true,
  templateUrl: './so-cong-chung-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SoCongChungDeleteDialogComponent {
  soCongChung?: ISoCongChung;

  protected soCongChungService = inject(SoCongChungService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.soCongChungService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
