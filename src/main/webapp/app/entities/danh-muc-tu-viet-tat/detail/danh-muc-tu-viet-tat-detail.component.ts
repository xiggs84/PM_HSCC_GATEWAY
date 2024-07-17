import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucTuVietTat } from '../danh-muc-tu-viet-tat.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-tu-viet-tat-detail',
  templateUrl: './danh-muc-tu-viet-tat-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucTuVietTatDetailComponent {
  danhMucTuVietTat = input<IDanhMucTuVietTat | null>(null);

  previousState(): void {
    window.history.back();
  }
}
