import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ILogHoaDonDienTu } from '../log-hoa-don-dien-tu.model';

@Component({
  standalone: true,
  selector: 'jhi-log-hoa-don-dien-tu-detail',
  templateUrl: './log-hoa-don-dien-tu-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class LogHoaDonDienTuDetailComponent {
  logHoaDonDienTu = input<ILogHoaDonDienTu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
