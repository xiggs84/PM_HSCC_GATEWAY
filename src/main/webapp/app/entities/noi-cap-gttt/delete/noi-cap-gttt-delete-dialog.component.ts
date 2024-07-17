import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { INoiCapGttt } from '../noi-cap-gttt.model';
import { NoiCapGtttService } from '../service/noi-cap-gttt.service';

@Component({
  standalone: true,
  templateUrl: './noi-cap-gttt-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class NoiCapGtttDeleteDialogComponent {
  noiCapGttt?: INoiCapGttt;

  protected noiCapGtttService = inject(NoiCapGtttService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.noiCapGtttService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
