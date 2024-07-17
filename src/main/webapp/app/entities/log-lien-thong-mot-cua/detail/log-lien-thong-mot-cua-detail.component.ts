import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ILogLienThongMotCua } from '../log-lien-thong-mot-cua.model';

@Component({
  standalone: true,
  selector: 'jhi-log-lien-thong-mot-cua-detail',
  templateUrl: './log-lien-thong-mot-cua-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class LogLienThongMotCuaDetailComponent {
  logLienThongMotCua = input<ILogLienThongMotCua | null>(null);

  previousState(): void {
    window.history.back();
  }
}
