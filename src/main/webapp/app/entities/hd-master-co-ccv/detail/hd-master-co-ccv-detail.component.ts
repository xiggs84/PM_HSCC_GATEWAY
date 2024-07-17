import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IHdMasterCoCcv } from '../hd-master-co-ccv.model';

@Component({
  standalone: true,
  selector: 'jhi-hd-master-co-ccv-detail',
  templateUrl: './hd-master-co-ccv-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class HdMasterCoCcvDetailComponent {
  hdMasterCoCcv = input<IHdMasterCoCcv | null>(null);

  previousState(): void {
    window.history.back();
  }
}
