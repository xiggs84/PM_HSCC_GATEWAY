import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITaiSanDgc } from '../tai-san-dgc.model';

@Component({
  standalone: true,
  selector: 'jhi-tai-san-dgc-detail',
  templateUrl: './tai-san-dgc-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TaiSanDgcDetailComponent {
  taiSanDgc = input<ITaiSanDgc | null>(null);

  previousState(): void {
    window.history.back();
  }
}
