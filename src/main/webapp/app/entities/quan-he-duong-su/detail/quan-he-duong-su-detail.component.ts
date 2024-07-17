import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IQuanHeDuongSu } from '../quan-he-duong-su.model';

@Component({
  standalone: true,
  selector: 'jhi-quan-he-duong-su-detail',
  templateUrl: './quan-he-duong-su-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class QuanHeDuongSuDetailComponent {
  quanHeDuongSu = input<IQuanHeDuongSu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
