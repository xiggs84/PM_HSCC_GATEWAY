import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IMenuQuyen } from '../menu-quyen.model';
import { MenuQuyenService } from '../service/menu-quyen.service';

@Component({
  standalone: true,
  templateUrl: './menu-quyen-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class MenuQuyenDeleteDialogComponent {
  menuQuyen?: IMenuQuyen;

  protected menuQuyenService = inject(MenuQuyenService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.menuQuyenService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
