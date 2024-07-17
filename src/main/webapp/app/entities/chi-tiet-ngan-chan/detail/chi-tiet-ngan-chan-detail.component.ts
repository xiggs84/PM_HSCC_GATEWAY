import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IChiTietNganChan } from '../chi-tiet-ngan-chan.model';

@Component({
  standalone: true,
  selector: 'jhi-chi-tiet-ngan-chan-detail',
  templateUrl: './chi-tiet-ngan-chan-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ChiTietNganChanDetailComponent {
  chiTietNganChan = input<IChiTietNganChan | null>(null);

  previousState(): void {
    window.history.back();
  }
}
