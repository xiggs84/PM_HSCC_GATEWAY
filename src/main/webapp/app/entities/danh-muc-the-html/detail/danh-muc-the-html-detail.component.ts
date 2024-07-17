import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucTheHtml } from '../danh-muc-the-html.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-the-html-detail',
  templateUrl: './danh-muc-the-html-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucTheHtmlDetailComponent {
  danhMucTheHtml = input<IDanhMucTheHtml | null>(null);

  previousState(): void {
    window.history.back();
  }
}
