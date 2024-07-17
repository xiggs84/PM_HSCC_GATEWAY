import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICauHinhMauHopDong } from '../cau-hinh-mau-hop-dong.model';
import { CauHinhMauHopDongService } from '../service/cau-hinh-mau-hop-dong.service';

@Component({
  standalone: true,
  templateUrl: './cau-hinh-mau-hop-dong-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CauHinhMauHopDongDeleteDialogComponent {
  cauHinhMauHopDong?: ICauHinhMauHopDong;

  protected cauHinhMauHopDongService = inject(CauHinhMauHopDongService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cauHinhMauHopDongService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
