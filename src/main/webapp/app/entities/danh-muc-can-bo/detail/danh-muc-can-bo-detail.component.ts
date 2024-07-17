import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucCanBo } from '../danh-muc-can-bo.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-can-bo-detail',
  templateUrl: './danh-muc-can-bo-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucCanBoDetailComponent {
  danhMucCanBo = input<IDanhMucCanBo | null>(null);

  previousState(): void {
    window.history.back();
  }
}
