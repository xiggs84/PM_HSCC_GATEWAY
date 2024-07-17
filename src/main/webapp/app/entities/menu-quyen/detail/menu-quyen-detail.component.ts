import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IMenuQuyen } from '../menu-quyen.model';

@Component({
  standalone: true,
  selector: 'jhi-menu-quyen-detail',
  templateUrl: './menu-quyen-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class MenuQuyenDetailComponent {
  menuQuyen = input<IMenuQuyen | null>(null);

  previousState(): void {
    window.history.back();
  }
}
