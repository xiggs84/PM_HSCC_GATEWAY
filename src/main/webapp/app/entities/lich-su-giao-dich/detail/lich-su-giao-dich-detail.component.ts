import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ILichSuGiaoDich } from '../lich-su-giao-dich.model';

@Component({
  standalone: true,
  selector: 'jhi-lich-su-giao-dich-detail',
  templateUrl: './lich-su-giao-dich-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class LichSuGiaoDichDetailComponent {
  lichSuGiaoDich = input<ILichSuGiaoDich | null>(null);

  previousState(): void {
    window.history.back();
  }
}
