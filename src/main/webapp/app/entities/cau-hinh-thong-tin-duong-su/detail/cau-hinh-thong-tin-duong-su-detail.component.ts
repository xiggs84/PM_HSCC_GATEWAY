import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ICauHinhThongTinDuongSu } from '../cau-hinh-thong-tin-duong-su.model';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-thong-tin-duong-su-detail',
  templateUrl: './cau-hinh-thong-tin-duong-su-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CauHinhThongTinDuongSuDetailComponent {
  cauHinhThongTinDuongSu = input<ICauHinhThongTinDuongSu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
