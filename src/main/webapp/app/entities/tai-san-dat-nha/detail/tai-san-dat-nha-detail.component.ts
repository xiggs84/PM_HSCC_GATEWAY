import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITaiSanDatNha } from '../tai-san-dat-nha.model';

@Component({
  standalone: true,
  selector: 'jhi-tai-san-dat-nha-detail',
  templateUrl: './tai-san-dat-nha-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TaiSanDatNhaDetailComponent {
  taiSanDatNha = input<ITaiSanDatNha | null>(null);

  previousState(): void {
    window.history.back();
  }
}
