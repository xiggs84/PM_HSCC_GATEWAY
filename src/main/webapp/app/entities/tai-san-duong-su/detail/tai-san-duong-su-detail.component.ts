import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITaiSanDuongSu } from '../tai-san-duong-su.model';

@Component({
  standalone: true,
  selector: 'jhi-tai-san-duong-su-detail',
  templateUrl: './tai-san-duong-su-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TaiSanDuongSuDetailComponent {
  taiSanDuongSu = input<ITaiSanDuongSu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
