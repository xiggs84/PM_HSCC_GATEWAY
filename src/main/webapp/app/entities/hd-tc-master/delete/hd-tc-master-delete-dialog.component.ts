import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IHdTcMaster } from '../hd-tc-master.model';
import { HdTcMasterService } from '../service/hd-tc-master.service';

@Component({
  standalone: true,
  templateUrl: './hd-tc-master-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class HdTcMasterDeleteDialogComponent {
  hdTcMaster?: IHdTcMaster;

  protected hdTcMasterService = inject(HdTcMasterService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.hdTcMasterService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
