import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITaisanSaiQsddDgc } from '../taisan-sai-qsdd-dgc.model';
import { TaisanSaiQsddDgcService } from '../service/taisan-sai-qsdd-dgc.service';
import { TaisanSaiQsddDgcFormService, TaisanSaiQsddDgcFormGroup } from './taisan-sai-qsdd-dgc-form.service';

@Component({
  standalone: true,
  selector: 'jhi-taisan-sai-qsdd-dgc-update',
  templateUrl: './taisan-sai-qsdd-dgc-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaisanSaiQsddDgcUpdateComponent implements OnInit {
  isSaving = false;
  taisanSaiQsddDgc: ITaisanSaiQsddDgc | null = null;

  protected taisanSaiQsddDgcService = inject(TaisanSaiQsddDgcService);
  protected taisanSaiQsddDgcFormService = inject(TaisanSaiQsddDgcFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaisanSaiQsddDgcFormGroup = this.taisanSaiQsddDgcFormService.createTaisanSaiQsddDgcFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taisanSaiQsddDgc }) => {
      this.taisanSaiQsddDgc = taisanSaiQsddDgc;
      if (taisanSaiQsddDgc) {
        this.updateForm(taisanSaiQsddDgc);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taisanSaiQsddDgc = this.taisanSaiQsddDgcFormService.getTaisanSaiQsddDgc(this.editForm);
    if (taisanSaiQsddDgc.id !== null) {
      this.subscribeToSaveResponse(this.taisanSaiQsddDgcService.update(taisanSaiQsddDgc));
    } else {
      this.subscribeToSaveResponse(this.taisanSaiQsddDgcService.create(taisanSaiQsddDgc));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaisanSaiQsddDgc>>): void {
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

  protected updateForm(taisanSaiQsddDgc: ITaisanSaiQsddDgc): void {
    this.taisanSaiQsddDgc = taisanSaiQsddDgc;
    this.taisanSaiQsddDgcFormService.resetForm(this.editForm, taisanSaiQsddDgc);
  }
}
