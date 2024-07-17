import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IUserOnline } from '../user-online.model';

@Component({
  standalone: true,
  selector: 'jhi-user-online-detail',
  templateUrl: './user-online-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class UserOnlineDetailComponent {
  userOnline = input<IUserOnline | null>(null);

  previousState(): void {
    window.history.back();
  }
}
