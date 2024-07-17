import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILichSuGiaoDich } from '../lich-su-giao-dich.model';
import { LichSuGiaoDichService } from '../service/lich-su-giao-dich.service';

@Component({
  standalone: true,
  templateUrl: './lich-su-giao-dich-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LichSuGiaoDichDeleteDialogComponent {
  lichSuGiaoDich?: ILichSuGiaoDich;

  protected lichSuGiaoDichService = inject(LichSuGiaoDichService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lichSuGiaoDichService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
