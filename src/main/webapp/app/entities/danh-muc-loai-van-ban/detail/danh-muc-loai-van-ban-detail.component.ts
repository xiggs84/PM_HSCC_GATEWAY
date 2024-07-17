import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucLoaiVanBan } from '../danh-muc-loai-van-ban.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-van-ban-detail',
  templateUrl: './danh-muc-loai-van-ban-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucLoaiVanBanDetailComponent {
  danhMucLoaiVanBan = input<IDanhMucLoaiVanBan | null>(null);

  previousState(): void {
    window.history.back();
  }
}
