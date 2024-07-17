import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDuongSuTrungCmnd } from '../duong-su-trung-cmnd.model';

@Component({
  standalone: true,
  selector: 'jhi-duong-su-trung-cmnd-detail',
  templateUrl: './duong-su-trung-cmnd-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DuongSuTrungCmndDetailComponent {
  duongSuTrungCmnd = input<IDuongSuTrungCmnd | null>(null);

  previousState(): void {
    window.history.back();
  }
}
