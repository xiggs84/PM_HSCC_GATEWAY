import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IHdccCoTien } from '../hdcc-co-tien.model';

@Component({
  standalone: true,
  selector: 'jhi-hdcc-co-tien-detail',
  templateUrl: './hdcc-co-tien-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class HdccCoTienDetailComponent {
  hdccCoTien = input<IHdccCoTien | null>(null);

  previousState(): void {
    window.history.back();
  }
}
