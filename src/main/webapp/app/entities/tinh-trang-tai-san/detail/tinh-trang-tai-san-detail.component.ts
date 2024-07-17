import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITinhTrangTaiSan } from '../tinh-trang-tai-san.model';

@Component({
  standalone: true,
  selector: 'jhi-tinh-trang-tai-san-detail',
  templateUrl: './tinh-trang-tai-san-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TinhTrangTaiSanDetailComponent {
  tinhTrangTaiSan = input<ITinhTrangTaiSan | null>(null);

  previousState(): void {
    window.history.back();
  }
}
