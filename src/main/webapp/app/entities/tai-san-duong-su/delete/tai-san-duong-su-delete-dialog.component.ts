import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITaiSanDuongSu } from '../tai-san-duong-su.model';
import { TaiSanDuongSuService } from '../service/tai-san-duong-su.service';

@Component({
  standalone: true,
  templateUrl: './tai-san-duong-su-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TaiSanDuongSuDeleteDialogComponent {
  taiSanDuongSu?: ITaiSanDuongSu;

  protected taiSanDuongSuService = inject(TaiSanDuongSuService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taiSanDuongSuService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
