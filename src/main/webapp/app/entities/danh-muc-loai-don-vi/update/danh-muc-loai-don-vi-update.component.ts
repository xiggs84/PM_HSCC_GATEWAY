import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiDonVi } from '../danh-muc-loai-don-vi.model';
import { DanhMucLoaiDonViService } from '../service/danh-muc-loai-don-vi.service';
import { DanhMucLoaiDonViFormService, DanhMucLoaiDonViFormGroup } from './danh-muc-loai-don-vi-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-don-vi-update',
  templateUrl: './danh-muc-loai-don-vi-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucLoaiDonViUpdateComponent implements OnInit {
  isSaving = false;
  danhMucLoaiDonVi: IDanhMucLoaiDonVi | null = null;

  protected danhMucLoaiDonViService = inject(DanhMucLoaiDonViService);
  protected danhMucLoaiDonViFormService = inject(DanhMucLoaiDonViFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucLoaiDonViFormGroup = this.danhMucLoaiDonViFormService.createDanhMucLoaiDonViFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucLoaiDonVi }) => {
      this.danhMucLoaiDonVi = danhMucLoaiDonVi;
      if (danhMucLoaiDonVi) {
        this.updateForm(danhMucLoaiDonVi);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucLoaiDonVi = this.danhMucLoaiDonViFormService.getDanhMucLoaiDonVi(this.editForm);
    if (danhMucLoaiDonVi.id !== null) {
      this.subscribeToSaveResponse(this.danhMucLoaiDonViService.update(danhMucLoaiDonVi));
    } else {
      this.subscribeToSaveResponse(this.danhMucLoaiDonViService.create(danhMucLoaiDonVi));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucLoaiDonVi>>): void {
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

  protected updateForm(danhMucLoaiDonVi: IDanhMucLoaiDonVi): void {
    this.danhMucLoaiDonVi = danhMucLoaiDonVi;
    this.danhMucLoaiDonViFormService.resetForm(this.editForm, danhMucLoaiDonVi);
  }
}
