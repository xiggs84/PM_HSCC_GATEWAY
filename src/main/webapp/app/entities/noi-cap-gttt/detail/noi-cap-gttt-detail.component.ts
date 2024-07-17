import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { INoiCapGttt } from '../noi-cap-gttt.model';

@Component({
  standalone: true,
  selector: 'jhi-noi-cap-gttt-detail',
  templateUrl: './noi-cap-gttt-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class NoiCapGtttDetailComponent {
  noiCapGttt = input<INoiCapGttt | null>(null);

  previousState(): void {
    window.history.back();
  }
}
