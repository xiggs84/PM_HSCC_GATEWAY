import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucTinh } from '../danh-muc-tinh.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-tinh-detail',
  templateUrl: './danh-muc-tinh-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucTinhDetailComponent {
  danhMucTinh = input<IDanhMucTinh | null>(null);

  previousState(): void {
    window.history.back();
  }
}
