import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucKeyDongTuFaq } from '../danh-muc-key-dong-tu-faq.model';
import { DanhMucKeyDongTuFaqService } from '../service/danh-muc-key-dong-tu-faq.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-key-dong-tu-faq-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucKeyDongTuFaqDeleteDialogComponent {
  danhMucKeyDongTuFaq?: IDanhMucKeyDongTuFaq;

  protected danhMucKeyDongTuFaqService = inject(DanhMucKeyDongTuFaqService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucKeyDongTuFaqService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
