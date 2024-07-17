import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ISoLanHoiFaq } from '../so-lan-hoi-faq.model';

@Component({
  standalone: true,
  selector: 'jhi-so-lan-hoi-faq-detail',
  templateUrl: './so-lan-hoi-faq-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class SoLanHoiFaqDetailComponent {
  soLanHoiFaq = input<ISoLanHoiFaq | null>(null);

  previousState(): void {
    window.history.back();
  }
}
