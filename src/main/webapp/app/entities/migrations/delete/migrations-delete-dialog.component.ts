import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IMigrations } from '../migrations.model';
import { MigrationsService } from '../service/migrations.service';

@Component({
  standalone: true,
  templateUrl: './migrations-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class MigrationsDeleteDialogComponent {
  migrations?: IMigrations;

  protected migrationsService = inject(MigrationsService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.migrationsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
