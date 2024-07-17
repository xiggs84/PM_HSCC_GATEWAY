import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucKeyDanhTuFaq } from '../danh-muc-key-danh-tu-faq.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-key-danh-tu-faq-detail',
  templateUrl: './danh-muc-key-danh-tu-faq-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucKeyDanhTuFaqDetailComponent {
  danhMucKeyDanhTuFaq = input<IDanhMucKeyDanhTuFaq | null>(null);

  previousState(): void {
    window.history.back();
  }
}
