import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISoLanHoiFaq } from '../so-lan-hoi-faq.model';
import { SoLanHoiFaqService } from '../service/so-lan-hoi-faq.service';
import { SoLanHoiFaqFormService, SoLanHoiFaqFormGroup } from './so-lan-hoi-faq-form.service';

@Component({
  standalone: true,
  selector: 'jhi-so-lan-hoi-faq-update',
  templateUrl: './so-lan-hoi-faq-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SoLanHoiFaqUpdateComponent implements OnInit {
  isSaving = false;
  soLanHoiFaq: ISoLanHoiFaq | null = null;

  protected soLanHoiFaqService = inject(SoLanHoiFaqService);
  protected soLanHoiFaqFormService = inject(SoLanHoiFaqFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SoLanHoiFaqFormGroup = this.soLanHoiFaqFormService.createSoLanHoiFaqFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soLanHoiFaq }) => {
      this.soLanHoiFaq = soLanHoiFaq;
      if (soLanHoiFaq) {
        this.updateForm(soLanHoiFaq);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const soLanHoiFaq = this.soLanHoiFaqFormService.getSoLanHoiFaq(this.editForm);
    if (soLanHoiFaq.id !== null) {
      this.subscribeToSaveResponse(this.soLanHoiFaqService.update(soLanHoiFaq));
    } else {
      this.subscribeToSaveResponse(this.soLanHoiFaqService.create(soLanHoiFaq));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISoLanHoiFaq>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(soLanHoiFaq: ISoLanHoiFaq): void {
    this.soLanHoiFaq = soLanHoiFaq;
    this.soLanHoiFaqFormService.resetForm(this.editForm, soLanHoiFaq);
  }
}
