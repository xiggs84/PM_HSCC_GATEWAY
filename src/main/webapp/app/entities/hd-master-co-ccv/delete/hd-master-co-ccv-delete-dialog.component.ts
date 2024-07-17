import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IHdMasterCoCcv } from '../hd-master-co-ccv.model';
import { HdMasterCoCcvService } from '../service/hd-master-co-ccv.service';

@Component({
  standalone: true,
  templateUrl: './hd-master-co-ccv-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class HdMasterCoCcvDeleteDialogComponent {
  hdMasterCoCcv?: IHdMasterCoCcv;

  protected hdMasterCoCcvService = inject(HdMasterCoCcvService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.hdMasterCoCcvService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
