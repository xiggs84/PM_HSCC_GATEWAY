import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucKeyDanhTuFaq } from '../danh-muc-key-danh-tu-faq.model';
import { DanhMucKeyDanhTuFaqService } from '../service/danh-muc-key-danh-tu-faq.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-key-danh-tu-faq-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucKeyDanhTuFaqDeleteDialogComponent {
  danhMucKeyDanhTuFaq?: IDanhMucKeyDanhTuFaq;

  protected danhMucKeyDanhTuFaqService = inject(DanhMucKeyDanhTuFaqService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucKeyDanhTuFaqService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
