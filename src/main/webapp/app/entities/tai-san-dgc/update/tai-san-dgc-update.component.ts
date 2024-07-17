import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITaiSanDgc } from '../tai-san-dgc.model';
import { TaiSanDgcService } from '../service/tai-san-dgc.service';
import { TaiSanDgcFormService, TaiSanDgcFormGroup } from './tai-san-dgc-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tai-san-dgc-update',
  templateUrl: './tai-san-dgc-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaiSanDgcUpdateComponent implements OnInit {
  isSaving = false;
  taiSanDgc: ITaiSanDgc | null = null;

  protected taiSanDgcService = inject(TaiSanDgcService);
  protected taiSanDgcFormService = inject(TaiSanDgcFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaiSanDgcFormGroup = this.taiSanDgcFormService.createTaiSanDgcFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taiSanDgc }) => {
      this.taiSanDgc = taiSanDgc;
      if (taiSanDgc) {
        this.updateForm(taiSanDgc);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taiSanDgc = this.taiSanDgcFormService.getTaiSanDgc(this.editForm);
    if (taiSanDgc.id !== null) {
      this.subscribeToSaveResponse(this.taiSanDgcService.update(taiSanDgc));
    } else {
      this.subscribeToSaveResponse(this.taiSanDgcService.create(taiSanDgc));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaiSanDgc>>): void {
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

  protected updateForm(taiSanDgc: ITaiSanDgc): void {
    this.taiSanDgc = taiSanDgc;
    this.taiSanDgcFormService.resetForm(this.editForm, taiSanDgc);
  }
}
