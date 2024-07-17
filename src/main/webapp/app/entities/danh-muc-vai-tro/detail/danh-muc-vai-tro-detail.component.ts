import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucVaiTro } from '../danh-muc-vai-tro.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-vai-tro-detail',
  templateUrl: './danh-muc-vai-tro-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucVaiTroDetailComponent {
  danhMucVaiTro = input<IDanhMucVaiTro | null>(null);

  previousState(): void {
    window.history.back();
  }
}
