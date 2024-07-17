import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IMigrations } from '../migrations.model';

@Component({
  standalone: true,
  selector: 'jhi-migrations-detail',
  templateUrl: './migrations-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class MigrationsDetailComponent {
  migrations = input<IMigrations | null>(null);

  previousState(): void {
    window.history.back();
  }
}
