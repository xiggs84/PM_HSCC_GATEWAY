import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITaisanSaiDgc } from '../taisan-sai-dgc.model';
import { TaisanSaiDgcService } from '../service/taisan-sai-dgc.service';
import { TaisanSaiDgcFormService, TaisanSaiDgcFormGroup } from './taisan-sai-dgc-form.service';

@Component({
  standalone: true,
  selector: 'jhi-taisan-sai-dgc-update',
  templateUrl: './taisan-sai-dgc-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaisanSaiDgcUpdateComponent implements OnInit {
  isSaving = false;
  taisanSaiDgc: ITaisanSaiDgc | null = null;

  protected taisanSaiDgcService = inject(TaisanSaiDgcService);
  protected taisanSaiDgcFormService = inject(TaisanSaiDgcFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaisanSaiDgcFormGroup = this.taisanSaiDgcFormService.createTaisanSaiDgcFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taisanSaiDgc }) => {
      this.taisanSaiDgc = taisanSaiDgc;
      if (taisanSaiDgc) {
        this.updateForm(taisanSaiDgc);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taisanSaiDgc = this.taisanSaiDgcFormService.getTaisanSaiDgc(this.editForm);
    if (taisanSaiDgc.id !== null) {
      this.subscribeToSaveResponse(this.taisanSaiDgcService.update(taisanSaiDgc));
    } else {
      this.subscribeToSaveResponse(this.taisanSaiDgcService.create(taisanSaiDgc));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaisanSaiDgc>>): void {
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

  protected updateForm(taisanSaiDgc: ITaisanSaiDgc): void {
    this.taisanSaiDgc = taisanSaiDgc;
    this.taisanSaiDgcFormService.resetForm(this.editForm, taisanSaiDgc);
  }
}
