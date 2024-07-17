import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhSachHopDong } from '../danh-sach-hop-dong.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-hop-dong-detail',
  templateUrl: './danh-sach-hop-dong-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhSachHopDongDetailComponent {
  danhSachHopDong = input<IDanhSachHopDong | null>(null);

  previousState(): void {
    window.history.back();
  }
}
