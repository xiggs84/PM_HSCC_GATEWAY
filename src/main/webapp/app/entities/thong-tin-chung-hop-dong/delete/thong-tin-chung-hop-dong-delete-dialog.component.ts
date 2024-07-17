import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IThongTinChungHopDong } from '../thong-tin-chung-hop-dong.model';
import { ThongTinChungHopDongService } from '../service/thong-tin-chung-hop-dong.service';

@Component({
  standalone: true,
  templateUrl: './thong-tin-chung-hop-dong-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ThongTinChungHopDongDeleteDialogComponent {
  thongTinChungHopDong?: IThongTinChungHopDong;

  protected thongTinChungHopDongService = inject(ThongTinChungHopDongService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.thongTinChungHopDongService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
