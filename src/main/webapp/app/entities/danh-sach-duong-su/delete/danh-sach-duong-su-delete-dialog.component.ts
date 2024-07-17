import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhSachDuongSu } from '../danh-sach-duong-su.model';
import { DanhSachDuongSuService } from '../service/danh-sach-duong-su.service';

@Component({
  standalone: true,
  templateUrl: './danh-sach-duong-su-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhSachDuongSuDeleteDialogComponent {
  danhSachDuongSu?: IDanhSachDuongSu;

  protected danhSachDuongSuService = inject(DanhSachDuongSuService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhSachDuongSuService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
