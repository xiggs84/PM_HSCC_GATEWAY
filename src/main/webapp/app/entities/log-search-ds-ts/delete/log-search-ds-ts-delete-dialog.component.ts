import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILogSearchDsTs } from '../log-search-ds-ts.model';
import { LogSearchDsTsService } from '../service/log-search-ds-ts.service';

@Component({
  standalone: true,
  templateUrl: './log-search-ds-ts-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LogSearchDsTsDeleteDialogComponent {
  logSearchDsTs?: ILogSearchDsTs;

  protected logSearchDsTsService = inject(LogSearchDsTsService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.logSearchDsTsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
