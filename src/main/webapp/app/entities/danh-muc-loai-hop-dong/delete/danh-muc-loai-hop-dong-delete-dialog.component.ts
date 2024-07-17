import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucLoaiHopDong } from '../danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from '../service/danh-muc-loai-hop-dong.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-loai-hop-dong-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucLoaiHopDongDeleteDialogComponent {
  danhMucLoaiHopDong?: IDanhMucLoaiHopDong;

  protected danhMucLoaiHopDongService = inject(DanhMucLoaiHopDongService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucLoaiHopDongService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
