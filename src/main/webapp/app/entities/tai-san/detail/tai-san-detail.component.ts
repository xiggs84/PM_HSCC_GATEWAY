import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITaiSan } from '../tai-san.model';

@Component({
  standalone: true,
  selector: 'jhi-tai-san-detail',
  templateUrl: './tai-san-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TaiSanDetailComponent {
  taiSan = input<ITaiSan | null>(null);

  previousState(): void {
    window.history.back();
  }
}
