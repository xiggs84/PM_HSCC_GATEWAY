import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiDuongSu } from '../danh-muc-loai-duong-su.model';
import { DanhMucLoaiDuongSuService } from '../service/danh-muc-loai-duong-su.service';
import { DanhMucLoaiDuongSuFormService, DanhMucLoaiDuongSuFormGroup } from './danh-muc-loai-duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-duong-su-update',
  templateUrl: './danh-muc-loai-duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucLoaiDuongSuUpdateComponent implements OnInit {
  isSaving = false;
  danhMucLoaiDuongSu: IDanhMucLoaiDuongSu | null = null;

  protected danhMucLoaiDuongSuService = inject(DanhMucLoaiDuongSuService);
  protected danhMucLoaiDuongSuFormService = inject(DanhMucLoaiDuongSuFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucLoaiDuongSuFormGroup = this.danhMucLoaiDuongSuFormService.createDanhMucLoaiDuongSuFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucLoaiDuongSu }) => {
      this.danhMucLoaiDuongSu = danhMucLoaiDuongSu;
      if (danhMucLoaiDuongSu) {
        this.updateForm(danhMucLoaiDuongSu);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucLoaiDuongSu = this.danhMucLoaiDuongSuFormService.getDanhMucLoaiDuongSu(this.editForm);
    if (danhMucLoaiDuongSu.id !== null) {
      this.subscribeToSaveResponse(this.danhMucLoaiDuongSuService.update(danhMucLoaiDuongSu));
    } else {
      this.subscribeToSaveResponse(this.danhMucLoaiDuongSuService.create(danhMucLoaiDuongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucLoaiDuongSu>>): void {
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

  protected updateForm(danhMucLoaiDuongSu: IDanhMucLoaiDuongSu): void {
    this.danhMucLoaiDuongSu = danhMucLoaiDuongSu;
    this.danhMucLoaiDuongSuFormService.resetForm(this.editForm, danhMucLoaiDuongSu);
  }
}
