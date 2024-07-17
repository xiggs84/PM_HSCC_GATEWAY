import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILogLienThongMotCua } from '../log-lien-thong-mot-cua.model';
import { LogLienThongMotCuaService } from '../service/log-lien-thong-mot-cua.service';

@Component({
  standalone: true,
  templateUrl: './log-lien-thong-mot-cua-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LogLienThongMotCuaDeleteDialogComponent {
  logLienThongMotCua?: ILogLienThongMotCua;

  protected logLienThongMotCuaService = inject(LogLienThongMotCuaService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.logLienThongMotCuaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
