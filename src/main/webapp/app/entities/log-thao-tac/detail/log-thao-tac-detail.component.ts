import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ILogThaoTac } from '../log-thao-tac.model';

@Component({
  standalone: true,
  selector: 'jhi-log-thao-tac-detail',
  templateUrl: './log-thao-tac-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class LogThaoTacDetailComponent {
  logThaoTac = input<ILogThaoTac | null>(null);

  previousState(): void {
    window.history.back();
  }
}
