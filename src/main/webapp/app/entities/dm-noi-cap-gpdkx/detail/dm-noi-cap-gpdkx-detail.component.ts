import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDmNoiCapGpdkx } from '../dm-noi-cap-gpdkx.model';

@Component({
  standalone: true,
  selector: 'jhi-dm-noi-cap-gpdkx-detail',
  templateUrl: './dm-noi-cap-gpdkx-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DmNoiCapGpdkxDetailComponent {
  dmNoiCapGpdkx = input<IDmNoiCapGpdkx | null>(null);

  previousState(): void {
    window.history.back();
  }
}
