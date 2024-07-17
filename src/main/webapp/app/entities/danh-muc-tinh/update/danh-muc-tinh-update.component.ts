import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucTinh } from '../danh-muc-tinh.model';
import { DanhMucTinhService } from '../service/danh-muc-tinh.service';
import { DanhMucTinhFormService, DanhMucTinhFormGroup } from './danh-muc-tinh-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-tinh-update',
  templateUrl: './danh-muc-tinh-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucTinhUpdateComponent implements OnInit {
  isSaving = false;
  danhMucTinh: IDanhMucTinh | null = null;

  protected danhMucTinhService = inject(DanhMucTinhService);
  protected danhMucTinhFormService = inject(DanhMucTinhFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucTinhFormGroup = this.danhMucTinhFormService.createDanhMucTinhFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucTinh }) => {
      this.danhMucTinh = danhMucTinh;
      if (danhMucTinh) {
        this.updateForm(danhMucTinh);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucTinh = this.danhMucTinhFormService.getDanhMucTinh(this.editForm);
    if (danhMucTinh.id !== null) {
      this.subscribeToSaveResponse(this.danhMucTinhService.update(danhMucTinh));
    } else {
      this.subscribeToSaveResponse(this.danhMucTinhService.create(danhMucTinh));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucTinh>>): void {
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

  protected updateForm(danhMucTinh: IDanhMucTinh): void {
    this.danhMucTinh = danhMucTinh;
    this.danhMucTinhFormService.resetForm(this.editForm, danhMucTinh);
  }
}
