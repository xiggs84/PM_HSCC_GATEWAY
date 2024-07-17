import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IQuanHeDuongSu } from '../quan-he-duong-su.model';
import { QuanHeDuongSuService } from '../service/quan-he-duong-su.service';

@Component({
  standalone: true,
  templateUrl: './quan-he-duong-su-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class QuanHeDuongSuDeleteDialogComponent {
  quanHeDuongSu?: IQuanHeDuongSu;

  protected quanHeDuongSuService = inject(QuanHeDuongSuService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.quanHeDuongSuService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
