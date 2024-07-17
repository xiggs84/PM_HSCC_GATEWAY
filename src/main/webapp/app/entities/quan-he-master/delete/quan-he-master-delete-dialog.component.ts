import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IQuanHeMaster } from '../quan-he-master.model';
import { QuanHeMasterService } from '../service/quan-he-master.service';

@Component({
  standalone: true,
  templateUrl: './quan-he-master-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class QuanHeMasterDeleteDialogComponent {
  quanHeMaster?: IQuanHeMaster;

  protected quanHeMasterService = inject(QuanHeMasterService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.quanHeMasterService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
