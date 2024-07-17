import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IQuyen } from '../quyen.model';
import { QuyenService } from '../service/quyen.service';

@Component({
  standalone: true,
  templateUrl: './quyen-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class QuyenDeleteDialogComponent {
  quyen?: IQuyen;

  protected quyenService = inject(QuyenService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.quyenService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
