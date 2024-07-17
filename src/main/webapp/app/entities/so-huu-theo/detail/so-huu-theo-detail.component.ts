import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ISoHuuTheo } from '../so-huu-theo.model';

@Component({
  standalone: true,
  selector: 'jhi-so-huu-theo-detail',
  templateUrl: './so-huu-theo-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class SoHuuTheoDetailComponent {
  soHuuTheo = input<ISoHuuTheo | null>(null);

  previousState(): void {
    window.history.back();
  }
}
