import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucLoaiTaiSan } from '../danh-muc-loai-tai-san.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-tai-san-detail',
  templateUrl: './danh-muc-loai-tai-san-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucLoaiTaiSanDetailComponent {
  danhMucLoaiTaiSan = input<IDanhMucLoaiTaiSan | null>(null);

  previousState(): void {
    window.history.back();
  }
}
