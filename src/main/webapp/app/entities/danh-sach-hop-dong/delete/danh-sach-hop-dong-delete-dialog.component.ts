import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhSachHopDong } from '../danh-sach-hop-dong.model';
import { DanhSachHopDongService } from '../service/danh-sach-hop-dong.service';

@Component({
  standalone: true,
  templateUrl: './danh-sach-hop-dong-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhSachHopDongDeleteDialogComponent {
  danhSachHopDong?: IDanhSachHopDong;

  protected danhSachHopDongService = inject(DanhSachHopDongService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhSachHopDongService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
