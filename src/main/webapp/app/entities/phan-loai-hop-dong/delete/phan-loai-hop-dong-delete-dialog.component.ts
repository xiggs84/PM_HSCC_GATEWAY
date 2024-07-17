import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IPhanLoaiHopDong } from '../phan-loai-hop-dong.model';
import { PhanLoaiHopDongService } from '../service/phan-loai-hop-dong.service';

@Component({
  standalone: true,
  templateUrl: './phan-loai-hop-dong-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class PhanLoaiHopDongDeleteDialogComponent {
  phanLoaiHopDong?: IPhanLoaiHopDong;

  protected phanLoaiHopDongService = inject(PhanLoaiHopDongService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.phanLoaiHopDongService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
