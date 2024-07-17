import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucFaq } from '../danh-muc-faq.model';
import { DanhMucFaqService } from '../service/danh-muc-faq.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-faq-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucFaqDeleteDialogComponent {
  danhMucFaq?: IDanhMucFaq;

  protected danhMucFaqService = inject(DanhMucFaqService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucFaqService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
