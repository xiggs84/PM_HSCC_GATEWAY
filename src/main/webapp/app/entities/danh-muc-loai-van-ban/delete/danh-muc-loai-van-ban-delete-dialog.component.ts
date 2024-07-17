import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucLoaiVanBan } from '../danh-muc-loai-van-ban.model';
import { DanhMucLoaiVanBanService } from '../service/danh-muc-loai-van-ban.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-loai-van-ban-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucLoaiVanBanDeleteDialogComponent {
  danhMucLoaiVanBan?: IDanhMucLoaiVanBan;

  protected danhMucLoaiVanBanService = inject(DanhMucLoaiVanBanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucLoaiVanBanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
