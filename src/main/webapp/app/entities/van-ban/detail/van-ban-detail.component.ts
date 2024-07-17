import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IVanBan } from '../van-ban.model';

@Component({
  standalone: true,
  selector: 'jhi-van-ban-detail',
  templateUrl: './van-ban-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class VanBanDetailComponent {
  vanBan = input<IVanBan | null>(null);

  previousState(): void {
    window.history.back();
  }
}
