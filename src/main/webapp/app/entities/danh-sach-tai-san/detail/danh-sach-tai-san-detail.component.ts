import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhSachTaiSan } from '../danh-sach-tai-san.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-tai-san-detail',
  templateUrl: './danh-sach-tai-san-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhSachTaiSanDetailComponent {
  danhSachTaiSan = input<IDanhSachTaiSan | null>(null);

  previousState(): void {
    window.history.back();
  }
}
