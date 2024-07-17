import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDuongSu } from '../duong-su.model';

@Component({
  standalone: true,
  selector: 'jhi-duong-su-detail',
  templateUrl: './duong-su-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DuongSuDetailComponent {
  duongSu = input<IDuongSu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
