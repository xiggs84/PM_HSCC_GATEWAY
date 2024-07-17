import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucLoaiDuongSu } from '../danh-muc-loai-duong-su.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-duong-su-detail',
  templateUrl: './danh-muc-loai-duong-su-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucLoaiDuongSuDetailComponent {
  danhMucLoaiDuongSu = input<IDanhMucLoaiDuongSu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
