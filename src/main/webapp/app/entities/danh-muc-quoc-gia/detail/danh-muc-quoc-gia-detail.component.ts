import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucQuocGia } from '../danh-muc-quoc-gia.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-quoc-gia-detail',
  templateUrl: './danh-muc-quoc-gia-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucQuocGiaDetailComponent {
  danhMucQuocGia = input<IDanhMucQuocGia | null>(null);

  previousState(): void {
    window.history.back();
  }
}
