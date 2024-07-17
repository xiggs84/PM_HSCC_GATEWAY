import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILogDangNhap } from '../log-dang-nhap.model';
import { LogDangNhapService } from '../service/log-dang-nhap.service';

@Component({
  standalone: true,
  templateUrl: './log-dang-nhap-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LogDangNhapDeleteDialogComponent {
  logDangNhap?: ILogDangNhap;

  protected logDangNhapService = inject(LogDangNhapService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.logDangNhapService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
