import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucKeyDongTuFaq } from '../danh-muc-key-dong-tu-faq.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-key-dong-tu-faq-detail',
  templateUrl: './danh-muc-key-dong-tu-faq-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucKeyDongTuFaqDetailComponent {
  danhMucKeyDongTuFaq = input<IDanhMucKeyDongTuFaq | null>(null);

  previousState(): void {
    window.history.back();
  }
}
