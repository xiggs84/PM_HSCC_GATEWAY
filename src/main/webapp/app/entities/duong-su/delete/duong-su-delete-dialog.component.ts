import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDuongSu } from '../duong-su.model';
import { DuongSuService } from '../service/duong-su.service';

@Component({
  standalone: true,
  templateUrl: './duong-su-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DuongSuDeleteDialogComponent {
  duongSu?: IDuongSu;

  protected duongSuService = inject(DuongSuService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.duongSuService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
