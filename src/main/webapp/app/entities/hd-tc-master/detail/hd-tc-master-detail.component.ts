import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IHdTcMaster } from '../hd-tc-master.model';

@Component({
  standalone: true,
  selector: 'jhi-hd-tc-master-detail',
  templateUrl: './hd-tc-master-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class HdTcMasterDetailComponent {
  hdTcMaster = input<IHdTcMaster | null>(null);

  previousState(): void {
    window.history.back();
  }
}
