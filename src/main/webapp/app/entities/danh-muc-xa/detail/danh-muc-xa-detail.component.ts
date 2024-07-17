import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucXa } from '../danh-muc-xa.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-xa-detail',
  templateUrl: './danh-muc-xa-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucXaDetailComponent {
  danhMucXa = input<IDanhMucXa | null>(null);

  previousState(): void {
    window.history.back();
  }
}
