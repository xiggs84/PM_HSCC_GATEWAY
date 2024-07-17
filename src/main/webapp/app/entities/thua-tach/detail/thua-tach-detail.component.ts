import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IThuaTach } from '../thua-tach.model';

@Component({
  standalone: true,
  selector: 'jhi-thua-tach-detail',
  templateUrl: './thua-tach-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ThuaTachDetailComponent {
  thuaTach = input<IThuaTach | null>(null);

  previousState(): void {
    window.history.back();
  }
}
