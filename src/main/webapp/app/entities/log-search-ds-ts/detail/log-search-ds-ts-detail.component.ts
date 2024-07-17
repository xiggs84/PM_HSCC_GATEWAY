import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ILogSearchDsTs } from '../log-search-ds-ts.model';

@Component({
  standalone: true,
  selector: 'jhi-log-search-ds-ts-detail',
  templateUrl: './log-search-ds-ts-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class LogSearchDsTsDetailComponent {
  logSearchDsTs = input<ILogSearchDsTs | null>(null);

  previousState(): void {
    window.history.back();
  }
}
