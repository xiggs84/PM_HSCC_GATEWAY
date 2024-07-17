import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucDonVi } from '../danh-muc-don-vi.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-don-vi-detail',
  templateUrl: './danh-muc-don-vi-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucDonViDetailComponent {
  danhMucDonVi = input<IDanhMucDonVi | null>(null);

  previousState(): void {
    window.history.back();
  }
}
