import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IHdMasterTcCoCcv } from '../hd-master-tc-co-ccv.model';

@Component({
  standalone: true,
  selector: 'jhi-hd-master-tc-co-ccv-detail',
  templateUrl: './hd-master-tc-co-ccv-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class HdMasterTcCoCcvDetailComponent {
  hdMasterTcCoCcv = input<IHdMasterTcCoCcv | null>(null);

  previousState(): void {
    window.history.back();
  }
}
