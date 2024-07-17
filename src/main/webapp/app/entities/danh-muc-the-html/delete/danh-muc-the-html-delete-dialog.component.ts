import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucTheHtml } from '../danh-muc-the-html.model';
import { DanhMucTheHtmlService } from '../service/danh-muc-the-html.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-the-html-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucTheHtmlDeleteDialogComponent {
  danhMucTheHtml?: IDanhMucTheHtml;

  protected danhMucTheHtmlService = inject(DanhMucTheHtmlService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucTheHtmlService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
