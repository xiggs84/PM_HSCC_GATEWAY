import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IHdMasterTcCoCcv } from '../hd-master-tc-co-ccv.model';
import { HdMasterTcCoCcvService } from '../service/hd-master-tc-co-ccv.service';

@Component({
  standalone: true,
  templateUrl: './hd-master-tc-co-ccv-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class HdMasterTcCoCcvDeleteDialogComponent {
  hdMasterTcCoCcv?: IHdMasterTcCoCcv;

  protected hdMasterTcCoCcvService = inject(HdMasterTcCoCcvService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.hdMasterTcCoCcvService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
