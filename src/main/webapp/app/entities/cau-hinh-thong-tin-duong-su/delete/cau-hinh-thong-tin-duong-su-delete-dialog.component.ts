import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICauHinhThongTinDuongSu } from '../cau-hinh-thong-tin-duong-su.model';
import { CauHinhThongTinDuongSuService } from '../service/cau-hinh-thong-tin-duong-su.service';

@Component({
  standalone: true,
  templateUrl: './cau-hinh-thong-tin-duong-su-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CauHinhThongTinDuongSuDeleteDialogComponent {
  cauHinhThongTinDuongSu?: ICauHinhThongTinDuongSu;

  protected cauHinhThongTinDuongSuService = inject(CauHinhThongTinDuongSuService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cauHinhThongTinDuongSuService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
