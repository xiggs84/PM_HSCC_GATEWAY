import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhsachDsNganchanTmp } from '../danhsach-ds-nganchan-tmp.model';

@Component({
  standalone: true,
  selector: 'jhi-danhsach-ds-nganchan-tmp-detail',
  templateUrl: './danhsach-ds-nganchan-tmp-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhsachDsNganchanTmpDetailComponent {
  danhsachDsNganchanTmp = input<IDanhsachDsNganchanTmp | null>(null);

  previousState(): void {
    window.history.back();
  }
}
