import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucTinhTrangHonNhan } from '../danh-muc-tinh-trang-hon-nhan.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-tinh-trang-hon-nhan-detail',
  templateUrl: './danh-muc-tinh-trang-hon-nhan-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucTinhTrangHonNhanDetailComponent {
  danhMucTinhTrangHonNhan = input<IDanhMucTinhTrangHonNhan | null>(null);

  previousState(): void {
    window.history.back();
  }
}
