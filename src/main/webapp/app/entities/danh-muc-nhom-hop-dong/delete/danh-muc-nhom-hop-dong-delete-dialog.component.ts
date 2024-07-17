import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucNhomHopDong } from '../danh-muc-nhom-hop-dong.model';
import { DanhMucNhomHopDongService } from '../service/danh-muc-nhom-hop-dong.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-nhom-hop-dong-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucNhomHopDongDeleteDialogComponent {
  danhMucNhomHopDong?: IDanhMucNhomHopDong;

  protected danhMucNhomHopDongService = inject(DanhMucNhomHopDongService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucNhomHopDongService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
