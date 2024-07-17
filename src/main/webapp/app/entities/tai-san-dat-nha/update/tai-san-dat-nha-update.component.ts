import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITaiSanDatNha } from '../tai-san-dat-nha.model';
import { TaiSanDatNhaService } from '../service/tai-san-dat-nha.service';
import { TaiSanDatNhaFormService, TaiSanDatNhaFormGroup } from './tai-san-dat-nha-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tai-san-dat-nha-update',
  templateUrl: './tai-san-dat-nha-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaiSanDatNhaUpdateComponent implements OnInit {
  isSaving = false;
  taiSanDatNha: ITaiSanDatNha | null = null;

  protected taiSanDatNhaService = inject(TaiSanDatNhaService);
  protected taiSanDatNhaFormService = inject(TaiSanDatNhaFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaiSanDatNhaFormGroup = this.taiSanDatNhaFormService.createTaiSanDatNhaFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taiSanDatNha }) => {
      this.taiSanDatNha = taiSanDatNha;
      if (taiSanDatNha) {
        this.updateForm(taiSanDatNha);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taiSanDatNha = this.taiSanDatNhaFormService.getTaiSanDatNha(this.editForm);
    if (taiSanDatNha.id !== null) {
      this.subscribeToSaveResponse(this.taiSanDatNhaService.update(taiSanDatNha));
    } else {
      this.subscribeToSaveResponse(this.taiSanDatNhaService.create(taiSanDatNha));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaiSanDatNha>>): void {
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

  protected updateForm(taiSanDatNha: ITaiSanDatNha): void {
    this.taiSanDatNha = taiSanDatNha;
    this.taiSanDatNhaFormService.resetForm(this.editForm, taiSanDatNha);
  }
}
