import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhSachDuongSu } from '../danh-sach-duong-su.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-duong-su-detail',
  templateUrl: './danh-sach-duong-su-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhSachDuongSuDetailComponent {
  danhSachDuongSu = input<IDanhSachDuongSu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
