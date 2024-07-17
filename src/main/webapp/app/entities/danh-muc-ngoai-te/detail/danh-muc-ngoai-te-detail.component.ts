import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucNgoaiTe } from '../danh-muc-ngoai-te.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-ngoai-te-detail',
  templateUrl: './danh-muc-ngoai-te-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucNgoaiTeDetailComponent {
  danhMucNgoaiTe = input<IDanhMucNgoaiTe | null>(null);

  previousState(): void {
    window.history.back();
  }
}
