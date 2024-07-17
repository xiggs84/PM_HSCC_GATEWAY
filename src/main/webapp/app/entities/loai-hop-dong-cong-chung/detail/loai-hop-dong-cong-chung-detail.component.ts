import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ILoaiHopDongCongChung } from '../loai-hop-dong-cong-chung.model';

@Component({
  standalone: true,
  selector: 'jhi-loai-hop-dong-cong-chung-detail',
  templateUrl: './loai-hop-dong-cong-chung-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class LoaiHopDongCongChungDetailComponent {
  loaiHopDongCongChung = input<ILoaiHopDongCongChung | null>(null);

  previousState(): void {
    window.history.back();
  }
}
