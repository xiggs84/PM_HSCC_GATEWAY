import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICauHinhHoaDonDienTu } from '../cau-hinh-hoa-don-dien-tu.model';
import { CauHinhHoaDonDienTuService } from '../service/cau-hinh-hoa-don-dien-tu.service';

@Component({
  standalone: true,
  templateUrl: './cau-hinh-hoa-don-dien-tu-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CauHinhHoaDonDienTuDeleteDialogComponent {
  cauHinhHoaDonDienTu?: ICauHinhHoaDonDienTu;

  protected cauHinhHoaDonDienTuService = inject(CauHinhHoaDonDienTuService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cauHinhHoaDonDienTuService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
