import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucHuyen } from '../danh-muc-huyen.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-huyen-detail',
  templateUrl: './danh-muc-huyen-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucHuyenDetailComponent {
  danhMucHuyen = input<IDanhMucHuyen | null>(null);

  previousState(): void {
    window.history.back();
  }
}
