import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IPhanLoaiHopDong } from '../phan-loai-hop-dong.model';

@Component({
  standalone: true,
  selector: 'jhi-phan-loai-hop-dong-detail',
  templateUrl: './phan-loai-hop-dong-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class PhanLoaiHopDongDetailComponent {
  phanLoaiHopDong = input<IPhanLoaiHopDong | null>(null);

  previousState(): void {
    window.history.back();
  }
}
