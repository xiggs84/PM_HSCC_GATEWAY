import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITaisanSaiQsddDgc } from '../taisan-sai-qsdd-dgc.model';

@Component({
  standalone: true,
  selector: 'jhi-taisan-sai-qsdd-dgc-detail',
  templateUrl: './taisan-sai-qsdd-dgc-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TaisanSaiQsddDgcDetailComponent {
  taisanSaiQsddDgc = input<ITaisanSaiQsddDgc | null>(null);

  previousState(): void {
    window.history.back();
  }
}
