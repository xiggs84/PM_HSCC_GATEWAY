import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICauHinhHopDong } from '../cau-hinh-hop-dong.model';
import { CauHinhHopDongService } from '../service/cau-hinh-hop-dong.service';

@Component({
  standalone: true,
  templateUrl: './cau-hinh-hop-dong-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CauHinhHopDongDeleteDialogComponent {
  cauHinhHopDong?: ICauHinhHopDong;

  protected cauHinhHopDongService = inject(CauHinhHopDongService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cauHinhHopDongService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
