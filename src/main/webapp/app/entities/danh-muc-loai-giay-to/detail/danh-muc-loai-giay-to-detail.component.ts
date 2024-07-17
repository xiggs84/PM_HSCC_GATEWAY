import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucLoaiGiayTo } from '../danh-muc-loai-giay-to.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-giay-to-detail',
  templateUrl: './danh-muc-loai-giay-to-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucLoaiGiayToDetailComponent {
  danhMucLoaiGiayTo = input<IDanhMucLoaiGiayTo | null>(null);

  previousState(): void {
    window.history.back();
  }
}
