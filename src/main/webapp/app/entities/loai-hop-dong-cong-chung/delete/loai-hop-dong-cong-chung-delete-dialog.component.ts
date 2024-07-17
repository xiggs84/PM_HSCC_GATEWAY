import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILoaiHopDongCongChung } from '../loai-hop-dong-cong-chung.model';
import { LoaiHopDongCongChungService } from '../service/loai-hop-dong-cong-chung.service';

@Component({
  standalone: true,
  templateUrl: './loai-hop-dong-cong-chung-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LoaiHopDongCongChungDeleteDialogComponent {
  loaiHopDongCongChung?: ILoaiHopDongCongChung;

  protected loaiHopDongCongChungService = inject(LoaiHopDongCongChungService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.loaiHopDongCongChungService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
