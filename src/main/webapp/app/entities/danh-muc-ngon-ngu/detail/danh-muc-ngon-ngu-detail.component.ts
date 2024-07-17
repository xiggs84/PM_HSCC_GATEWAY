import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucNgonNgu } from '../danh-muc-ngon-ngu.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-ngon-ngu-detail',
  templateUrl: './danh-muc-ngon-ngu-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucNgonNguDetailComponent {
  danhMucNgonNgu = input<IDanhMucNgonNgu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
