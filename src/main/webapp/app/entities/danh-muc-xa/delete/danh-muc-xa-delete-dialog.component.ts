import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucXa } from '../danh-muc-xa.model';
import { DanhMucXaService } from '../service/danh-muc-xa.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-xa-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucXaDeleteDialogComponent {
  danhMucXa?: IDanhMucXa;

  protected danhMucXaService = inject(DanhMucXaService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucXaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
