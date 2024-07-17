import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICauHinhThongTinLoaiTaiSan } from '../cau-hinh-thong-tin-loai-tai-san.model';
import { CauHinhThongTinLoaiTaiSanService } from '../service/cau-hinh-thong-tin-loai-tai-san.service';

@Component({
  standalone: true,
  templateUrl: './cau-hinh-thong-tin-loai-tai-san-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CauHinhThongTinLoaiTaiSanDeleteDialogComponent {
  cauHinhThongTinLoaiTaiSan?: ICauHinhThongTinLoaiTaiSan;

  protected cauHinhThongTinLoaiTaiSanService = inject(CauHinhThongTinLoaiTaiSanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cauHinhThongTinLoaiTaiSanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
