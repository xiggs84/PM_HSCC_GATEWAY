import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISoCongChung } from '../so-cong-chung.model';
import { SoCongChungService } from '../service/so-cong-chung.service';
import { SoCongChungFormService, SoCongChungFormGroup } from './so-cong-chung-form.service';

@Component({
  standalone: true,
  selector: 'jhi-so-cong-chung-update',
  templateUrl: './so-cong-chung-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SoCongChungUpdateComponent implements OnInit {
  isSaving = false;
  soCongChung: ISoCongChung | null = null;

  protected soCongChungService = inject(SoCongChungService);
  protected soCongChungFormService = inject(SoCongChungFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SoCongChungFormGroup = this.soCongChungFormService.createSoCongChungFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soCongChung }) => {
      this.soCongChung = soCongChung;
      if (soCongChung) {
        this.updateForm(soCongChung);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const soCongChung = this.soCongChungFormService.getSoCongChung(this.editForm);
    if (soCongChung.id !== null) {
      this.subscribeToSaveResponse(this.soCongChungService.update(soCongChung));
    } else {
      this.subscribeToSaveResponse(this.soCongChungService.create(soCongChung));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISoCongChung>>): void {
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

  protected updateForm(soCongChung: ISoCongChung): void {
    this.soCongChung = soCongChung;
    this.soCongChungFormService.resetForm(this.editForm, soCongChung);
  }
}
