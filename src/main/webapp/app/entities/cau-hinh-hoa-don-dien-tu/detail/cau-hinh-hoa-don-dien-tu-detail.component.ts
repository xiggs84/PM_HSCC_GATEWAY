import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ICauHinhHoaDonDienTu } from '../cau-hinh-hoa-don-dien-tu.model';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-hoa-don-dien-tu-detail',
  templateUrl: './cau-hinh-hoa-don-dien-tu-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CauHinhHoaDonDienTuDetailComponent {
  cauHinhHoaDonDienTu = input<ICauHinhHoaDonDienTu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
