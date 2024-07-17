import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucLoaiHopDong } from '../danh-muc-loai-hop-dong.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-hop-dong-detail',
  templateUrl: './danh-muc-loai-hop-dong-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucLoaiHopDongDetailComponent {
  danhMucLoaiHopDong = input<IDanhMucLoaiHopDong | null>(null);

  previousState(): void {
    window.history.back();
  }
}
