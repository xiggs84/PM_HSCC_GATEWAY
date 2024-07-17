import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ICauHinhHopDong } from '../cau-hinh-hop-dong.model';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-hop-dong-detail',
  templateUrl: './cau-hinh-hop-dong-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CauHinhHopDongDetailComponent {
  cauHinhHopDong = input<ICauHinhHopDong | null>(null);

  previousState(): void {
    window.history.back();
  }
}
