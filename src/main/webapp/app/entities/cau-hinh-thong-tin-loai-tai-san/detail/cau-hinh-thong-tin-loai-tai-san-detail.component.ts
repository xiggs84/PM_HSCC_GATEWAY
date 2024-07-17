import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ICauHinhThongTinLoaiTaiSan } from '../cau-hinh-thong-tin-loai-tai-san.model';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-thong-tin-loai-tai-san-detail',
  templateUrl: './cau-hinh-thong-tin-loai-tai-san-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CauHinhThongTinLoaiTaiSanDetailComponent {
  cauHinhThongTinLoaiTaiSan = input<ICauHinhThongTinLoaiTaiSan | null>(null);

  previousState(): void {
    window.history.back();
  }
}
