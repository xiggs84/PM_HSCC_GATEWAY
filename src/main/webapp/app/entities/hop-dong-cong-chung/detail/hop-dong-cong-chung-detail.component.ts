import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IHopDongCongChung } from '../hop-dong-cong-chung.model';

@Component({
  standalone: true,
  selector: 'jhi-hop-dong-cong-chung-detail',
  templateUrl: './hop-dong-cong-chung-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class HopDongCongChungDetailComponent {
  hopDongCongChung = input<IHopDongCongChung | null>(null);

  previousState(): void {
    window.history.back();
  }
}
