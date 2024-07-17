import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucTinhTrangHonNhan } from '../danh-muc-tinh-trang-hon-nhan.model';
import { DanhMucTinhTrangHonNhanService } from '../service/danh-muc-tinh-trang-hon-nhan.service';
import { DanhMucTinhTrangHonNhanFormService, DanhMucTinhTrangHonNhanFormGroup } from './danh-muc-tinh-trang-hon-nhan-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-tinh-trang-hon-nhan-update',
  templateUrl: './danh-muc-tinh-trang-hon-nhan-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucTinhTrangHonNhanUpdateComponent implements OnInit {
  isSaving = false;
  danhMucTinhTrangHonNhan: IDanhMucTinhTrangHonNhan | null = null;

  protected danhMucTinhTrangHonNhanService = inject(DanhMucTinhTrangHonNhanService);
  protected danhMucTinhTrangHonNhanFormService = inject(DanhMucTinhTrangHonNhanFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucTinhTrangHonNhanFormGroup = this.danhMucTinhTrangHonNhanFormService.createDanhMucTinhTrangHonNhanFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucTinhTrangHonNhan }) => {
      this.danhMucTinhTrangHonNhan = danhMucTinhTrangHonNhan;
      if (danhMucTinhTrangHonNhan) {
        this.updateForm(danhMucTinhTrangHonNhan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucTinhTrangHonNhan = this.danhMucTinhTrangHonNhanFormService.getDanhMucTinhTrangHonNhan(this.editForm);
    if (danhMucTinhTrangHonNhan.id !== null) {
      this.subscribeToSaveResponse(this.danhMucTinhTrangHonNhanService.update(danhMucTinhTrangHonNhan));
    } else {
      this.subscribeToSaveResponse(this.danhMucTinhTrangHonNhanService.create(danhMucTinhTrangHonNhan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucTinhTrangHonNhan>>): void {
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

  protected updateForm(danhMucTinhTrangHonNhan: IDanhMucTinhTrangHonNhan): void {
    this.danhMucTinhTrangHonNhan = danhMucTinhTrangHonNhan;
    this.danhMucTinhTrangHonNhanFormService.resetForm(this.editForm, danhMucTinhTrangHonNhan);
  }
}
