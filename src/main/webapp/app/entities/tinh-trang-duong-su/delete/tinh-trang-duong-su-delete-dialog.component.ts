import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITinhTrangDuongSu } from '../tinh-trang-duong-su.model';
import { TinhTrangDuongSuService } from '../service/tinh-trang-duong-su.service';

@Component({
  standalone: true,
  templateUrl: './tinh-trang-duong-su-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TinhTrangDuongSuDeleteDialogComponent {
  tinhTrangDuongSu?: ITinhTrangDuongSu;

  protected tinhTrangDuongSuService = inject(TinhTrangDuongSuService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tinhTrangDuongSuService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
