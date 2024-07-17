import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhSachTaiSan } from '../danh-sach-tai-san.model';
import { DanhSachTaiSanService } from '../service/danh-sach-tai-san.service';

@Component({
  standalone: true,
  templateUrl: './danh-sach-tai-san-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhSachTaiSanDeleteDialogComponent {
  danhSachTaiSan?: IDanhSachTaiSan;

  protected danhSachTaiSanService = inject(DanhSachTaiSanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhSachTaiSanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
