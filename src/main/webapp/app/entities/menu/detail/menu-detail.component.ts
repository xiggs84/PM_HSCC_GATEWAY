import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IMenu } from '../menu.model';

@Component({
  standalone: true,
  selector: 'jhi-menu-detail',
  templateUrl: './menu-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class MenuDetailComponent {
  menu = input<IMenu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
