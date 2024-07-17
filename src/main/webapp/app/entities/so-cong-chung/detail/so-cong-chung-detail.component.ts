import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ISoCongChung } from '../so-cong-chung.model';

@Component({
  standalone: true,
  selector: 'jhi-so-cong-chung-detail',
  templateUrl: './so-cong-chung-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class SoCongChungDetailComponent {
  soCongChung = input<ISoCongChung | null>(null);

  previousState(): void {
    window.history.back();
  }
}
