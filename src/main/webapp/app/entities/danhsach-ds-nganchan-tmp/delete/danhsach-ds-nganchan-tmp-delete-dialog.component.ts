import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhsachDsNganchanTmp } from '../danhsach-ds-nganchan-tmp.model';
import { DanhsachDsNganchanTmpService } from '../service/danhsach-ds-nganchan-tmp.service';

@Component({
  standalone: true,
  templateUrl: './danhsach-ds-nganchan-tmp-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhsachDsNganchanTmpDeleteDialogComponent {
  danhsachDsNganchanTmp?: IDanhsachDsNganchanTmp;

  protected danhsachDsNganchanTmpService = inject(DanhsachDsNganchanTmpService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhsachDsNganchanTmpService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
