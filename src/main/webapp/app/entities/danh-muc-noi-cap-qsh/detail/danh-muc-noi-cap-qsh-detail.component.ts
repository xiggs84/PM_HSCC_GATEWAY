import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucNoiCapQsh } from '../danh-muc-noi-cap-qsh.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-noi-cap-qsh-detail',
  templateUrl: './danh-muc-noi-cap-qsh-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucNoiCapQshDetailComponent {
  danhMucNoiCapQsh = input<IDanhMucNoiCapQsh | null>(null);

  previousState(): void {
    window.history.back();
  }
}
