import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucCapQuanLy } from '../danh-muc-cap-quan-ly.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-cap-quan-ly-detail',
  templateUrl: './danh-muc-cap-quan-ly-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucCapQuanLyDetailComponent {
  danhMucCapQuanLy = input<IDanhMucCapQuanLy | null>(null);

  previousState(): void {
    window.history.back();
  }
}
