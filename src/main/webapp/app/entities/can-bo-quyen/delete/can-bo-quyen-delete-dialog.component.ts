import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICanBoQuyen } from '../can-bo-quyen.model';
import { CanBoQuyenService } from '../service/can-bo-quyen.service';

@Component({
  standalone: true,
  templateUrl: './can-bo-quyen-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CanBoQuyenDeleteDialogComponent {
  canBoQuyen?: ICanBoQuyen;

  protected canBoQuyenService = inject(CanBoQuyenService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.canBoQuyenService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
