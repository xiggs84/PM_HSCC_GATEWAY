import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ILogDangNhap } from '../log-dang-nhap.model';

@Component({
  standalone: true,
  selector: 'jhi-log-dang-nhap-detail',
  templateUrl: './log-dang-nhap-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class LogDangNhapDetailComponent {
  logDangNhap = input<ILogDangNhap | null>(null);

  previousState(): void {
    window.history.back();
  }
}
