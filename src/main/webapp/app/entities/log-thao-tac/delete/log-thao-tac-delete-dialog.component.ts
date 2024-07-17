import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILogThaoTac } from '../log-thao-tac.model';
import { LogThaoTacService } from '../service/log-thao-tac.service';

@Component({
  standalone: true,
  templateUrl: './log-thao-tac-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LogThaoTacDeleteDialogComponent {
  logThaoTac?: ILogThaoTac;

  protected logThaoTacService = inject(LogThaoTacService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.logThaoTacService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
