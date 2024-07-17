import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucDauSoCmnd } from '../danh-muc-dau-so-cmnd.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-dau-so-cmnd-detail',
  templateUrl: './danh-muc-dau-so-cmnd-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucDauSoCmndDetailComponent {
  danhMucDauSoCmnd = input<IDanhMucDauSoCmnd | null>(null);

  previousState(): void {
    window.history.back();
  }
}
