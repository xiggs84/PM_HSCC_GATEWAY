import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IThongTinChungHopDong } from '../thong-tin-chung-hop-dong.model';

@Component({
  standalone: true,
  selector: 'jhi-thong-tin-chung-hop-dong-detail',
  templateUrl: './thong-tin-chung-hop-dong-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ThongTinChungHopDongDetailComponent {
  thongTinChungHopDong = input<IThongTinChungHopDong | null>(null);

  previousState(): void {
    window.history.back();
  }
}
