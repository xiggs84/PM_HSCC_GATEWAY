import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITaisanSaiDgc } from '../taisan-sai-dgc.model';

@Component({
  standalone: true,
  selector: 'jhi-taisan-sai-dgc-detail',
  templateUrl: './taisan-sai-dgc-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TaisanSaiDgcDetailComponent {
  taisanSaiDgc = input<ITaisanSaiDgc | null>(null);

  previousState(): void {
    window.history.back();
  }
}
