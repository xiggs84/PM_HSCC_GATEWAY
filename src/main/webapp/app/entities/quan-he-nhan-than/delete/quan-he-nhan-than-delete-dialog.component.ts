import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IQuanHeNhanThan } from '../quan-he-nhan-than.model';
import { QuanHeNhanThanService } from '../service/quan-he-nhan-than.service';

@Component({
  standalone: true,
  templateUrl: './quan-he-nhan-than-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class QuanHeNhanThanDeleteDialogComponent {
  quanHeNhanThan?: IQuanHeNhanThan;

  protected quanHeNhanThanService = inject(QuanHeNhanThanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.quanHeNhanThanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
