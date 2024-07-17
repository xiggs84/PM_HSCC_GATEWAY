import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILogHoaDonDienTu } from '../log-hoa-don-dien-tu.model';
import { LogHoaDonDienTuService } from '../service/log-hoa-don-dien-tu.service';

@Component({
  standalone: true,
  templateUrl: './log-hoa-don-dien-tu-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LogHoaDonDienTuDeleteDialogComponent {
  logHoaDonDienTu?: ILogHoaDonDienTu;

  protected logHoaDonDienTuService = inject(LogHoaDonDienTuService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.logHoaDonDienTuService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
