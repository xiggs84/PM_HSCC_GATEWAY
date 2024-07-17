import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITaisannhadatid } from '../taisannhadatid.model';

@Component({
  standalone: true,
  selector: 'jhi-taisannhadatid-detail',
  templateUrl: './taisannhadatid-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TaisannhadatidDetailComponent {
  taisannhadatid = input<ITaisannhadatid | null>(null);

  previousState(): void {
    window.history.back();
  }
}
