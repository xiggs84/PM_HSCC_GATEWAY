import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucFaq } from '../danh-muc-faq.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-faq-detail',
  templateUrl: './danh-muc-faq-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucFaqDetailComponent {
  danhMucFaq = input<IDanhMucFaq | null>(null);

  previousState(): void {
    window.history.back();
  }
}
