import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IHdccCoTien } from '../hdcc-co-tien.model';
import { HdccCoTienService } from '../service/hdcc-co-tien.service';

@Component({
  standalone: true,
  templateUrl: './hdcc-co-tien-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class HdccCoTienDeleteDialogComponent {
  hdccCoTien?: IHdccCoTien;

  protected hdccCoTienService = inject(HdccCoTienService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.hdccCoTienService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
