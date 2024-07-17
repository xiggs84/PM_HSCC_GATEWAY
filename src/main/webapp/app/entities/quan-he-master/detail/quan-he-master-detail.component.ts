import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IQuanHeMaster } from '../quan-he-master.model';

@Component({
  standalone: true,
  selector: 'jhi-quan-he-master-detail',
  templateUrl: './quan-he-master-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class QuanHeMasterDetailComponent {
  quanHeMaster = input<IQuanHeMaster | null>(null);

  previousState(): void {
    window.history.back();
  }
}
