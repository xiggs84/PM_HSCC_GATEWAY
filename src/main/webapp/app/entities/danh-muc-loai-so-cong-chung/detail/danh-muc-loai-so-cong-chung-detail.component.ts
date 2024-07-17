import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucLoaiSoCongChung } from '../danh-muc-loai-so-cong-chung.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-so-cong-chung-detail',
  templateUrl: './danh-muc-loai-so-cong-chung-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucLoaiSoCongChungDetailComponent {
  danhMucLoaiSoCongChung = input<IDanhMucLoaiSoCongChung | null>(null);

  previousState(): void {
    window.history.back();
  }
}
