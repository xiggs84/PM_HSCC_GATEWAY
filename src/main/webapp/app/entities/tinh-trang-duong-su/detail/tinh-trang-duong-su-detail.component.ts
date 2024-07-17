import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITinhTrangDuongSu } from '../tinh-trang-duong-su.model';

@Component({
  standalone: true,
  selector: 'jhi-tinh-trang-duong-su-detail',
  templateUrl: './tinh-trang-duong-su-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TinhTrangDuongSuDetailComponent {
  tinhTrangDuongSu = input<ITinhTrangDuongSu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
