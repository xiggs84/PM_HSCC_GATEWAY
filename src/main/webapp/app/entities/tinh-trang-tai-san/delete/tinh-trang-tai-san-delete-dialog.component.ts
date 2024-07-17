import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITinhTrangTaiSan } from '../tinh-trang-tai-san.model';
import { TinhTrangTaiSanService } from '../service/tinh-trang-tai-san.service';

@Component({
  standalone: true,
  templateUrl: './tinh-trang-tai-san-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TinhTrangTaiSanDeleteDialogComponent {
  tinhTrangTaiSan?: ITinhTrangTaiSan;

  protected tinhTrangTaiSanService = inject(TinhTrangTaiSanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tinhTrangTaiSanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
