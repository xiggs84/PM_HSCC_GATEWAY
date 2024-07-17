import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucFileUploadKyso } from '../danh-muc-file-upload-kyso.model';
import { DanhMucFileUploadKysoService } from '../service/danh-muc-file-upload-kyso.service';
import { DanhMucFileUploadKysoFormService, DanhMucFileUploadKysoFormGroup } from './danh-muc-file-upload-kyso-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-file-upload-kyso-update',
  templateUrl: './danh-muc-file-upload-kyso-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucFileUploadKysoUpdateComponent implements OnInit {
  isSaving = false;
  danhMucFileUploadKyso: IDanhMucFileUploadKyso | null = null;

  protected danhMucFileUploadKysoService = inject(DanhMucFileUploadKysoService);
  protected danhMucFileUploadKysoFormService = inject(DanhMucFileUploadKysoFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucFileUploadKysoFormGroup = this.danhMucFileUploadKysoFormService.createDanhMucFileUploadKysoFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucFileUploadKyso }) => {
      this.danhMucFileUploadKyso = danhMucFileUploadKyso;
      if (danhMucFileUploadKyso) {
        this.updateForm(danhMucFileUploadKyso);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucFileUploadKyso = this.danhMucFileUploadKysoFormService.getDanhMucFileUploadKyso(this.editForm);
    if (danhMucFileUploadKyso.id !== null) {
      this.subscribeToSaveResponse(this.danhMucFileUploadKysoService.update(danhMucFileUploadKyso));
    } else {
      this.subscribeToSaveResponse(this.danhMucFileUploadKysoService.create(danhMucFileUploadKyso));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucFileUploadKyso>>): void {
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

  protected updateForm(danhMucFileUploadKyso: IDanhMucFileUploadKyso): void {
    this.danhMucFileUploadKyso = danhMucFileUploadKyso;
    this.danhMucFileUploadKysoFormService.resetForm(this.editForm, danhMucFileUploadKyso);
  }
}
