import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISoLanHoiFaq } from '../so-lan-hoi-faq.model';
import { SoLanHoiFaqService } from '../service/so-lan-hoi-faq.service';

@Component({
  standalone: true,
  templateUrl: './so-lan-hoi-faq-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SoLanHoiFaqDeleteDialogComponent {
  soLanHoiFaq?: ISoLanHoiFaq;

  protected soLanHoiFaqService = inject(SoLanHoiFaqService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.soLanHoiFaqService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
