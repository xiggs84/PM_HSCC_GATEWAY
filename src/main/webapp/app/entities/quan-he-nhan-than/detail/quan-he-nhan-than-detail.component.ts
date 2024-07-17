import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IQuanHeNhanThan } from '../quan-he-nhan-than.model';

@Component({
  standalone: true,
  selector: 'jhi-quan-he-nhan-than-detail',
  templateUrl: './quan-he-nhan-than-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class QuanHeNhanThanDetailComponent {
  quanHeNhanThan = input<IQuanHeNhanThan | null>(null);

  previousState(): void {
    window.history.back();
  }
}
