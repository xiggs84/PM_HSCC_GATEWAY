import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ICauHinhMauHopDong } from '../cau-hinh-mau-hop-dong.model';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-mau-hop-dong-detail',
  templateUrl: './cau-hinh-mau-hop-dong-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CauHinhMauHopDongDetailComponent {
  cauHinhMauHopDong = input<ICauHinhMauHopDong | null>(null);

  previousState(): void {
    window.history.back();
  }
}
