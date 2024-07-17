import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucLoaiDonVi } from '../danh-muc-loai-don-vi.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-don-vi-detail',
  templateUrl: './danh-muc-loai-don-vi-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucLoaiDonViDetailComponent {
  danhMucLoaiDonVi = input<IDanhMucLoaiDonVi | null>(null);

  previousState(): void {
    window.history.back();
  }
}
