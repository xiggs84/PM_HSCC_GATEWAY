import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IUserOnline } from '../user-online.model';
import { UserOnlineService } from '../service/user-online.service';

@Component({
  standalone: true,
  templateUrl: './user-online-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class UserOnlineDeleteDialogComponent {
  userOnline?: IUserOnline;

  protected userOnlineService = inject(UserOnlineService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userOnlineService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
