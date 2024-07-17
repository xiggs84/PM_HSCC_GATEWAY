import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhMucFileUploadKyso } from '../danh-muc-file-upload-kyso.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-file-upload-kyso-detail',
  templateUrl: './danh-muc-file-upload-kyso-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucFileUploadKysoDetailComponent {
  danhMucFileUploadKyso = input<IDanhMucFileUploadKyso | null>(null);

  previousState(): void {
    window.history.back();
  }
}
