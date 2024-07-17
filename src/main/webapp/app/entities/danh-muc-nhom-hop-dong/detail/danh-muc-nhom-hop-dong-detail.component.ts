import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucNhomHopDong } from '../danh-muc-nhom-hop-dong.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-nhom-hop-dong-detail',
  templateUrl: './danh-muc-nhom-hop-dong-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucNhomHopDongDetailComponent {
  danhMucNhomHopDong = input<IDanhMucNhomHopDong | null>(null);

  previousState(): void {
    window.history.back();
  }
}
