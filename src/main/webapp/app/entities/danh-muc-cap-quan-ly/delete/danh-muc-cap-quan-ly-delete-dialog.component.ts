import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucCapQuanLy } from '../danh-muc-cap-quan-ly.model';
import { DanhMucCapQuanLyService } from '../service/danh-muc-cap-quan-ly.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-cap-quan-ly-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucCapQuanLyDeleteDialogComponent {
  danhMucCapQuanLy?: IDanhMucCapQuanLy;

  protected danhMucCapQuanLyService = inject(DanhMucCapQuanLyService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucCapQuanLyService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
