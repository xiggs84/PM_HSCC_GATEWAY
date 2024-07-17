import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISoHuuTheo } from '../so-huu-theo.model';
import { SoHuuTheoService } from '../service/so-huu-theo.service';

@Component({
  standalone: true,
  templateUrl: './so-huu-theo-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SoHuuTheoDeleteDialogComponent {
  soHuuTheo?: ISoHuuTheo;

  protected soHuuTheoService = inject(SoHuuTheoService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.soHuuTheoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
