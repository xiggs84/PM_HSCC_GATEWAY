import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IQuyen } from '../quyen.model';

@Component({
  standalone: true,
  selector: 'jhi-quyen-detail',
  templateUrl: './quyen-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class QuyenDetailComponent {
  quyen = input<IQuyen | null>(null);

  previousState(): void {
    window.history.back();
  }
}
