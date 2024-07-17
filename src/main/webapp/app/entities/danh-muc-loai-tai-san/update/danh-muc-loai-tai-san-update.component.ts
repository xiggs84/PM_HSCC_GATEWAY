import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiTaiSan } from '../danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from '../service/danh-muc-loai-tai-san.service';
import { DanhMucLoaiTaiSanFormService, DanhMucLoaiTaiSanFormGroup } from './danh-muc-loai-tai-san-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-tai-san-update',
  templateUrl: './danh-muc-loai-tai-san-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucLoaiTaiSanUpdateComponent implements OnInit {
  isSaving = false;
  danhMucLoaiTaiSan: IDanhMucLoaiTaiSan | null = null;

  protected danhMucLoaiTaiSanService = inject(DanhMucLoaiTaiSanService);
  protected danhMucLoaiTaiSanFormService = inject(DanhMucLoaiTaiSanFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucLoaiTaiSanFormGroup = this.danhMucLoaiTaiSanFormService.createDanhMucLoaiTaiSanFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucLoaiTaiSan }) => {
      this.danhMucLoaiTaiSan = danhMucLoaiTaiSan;
      if (danhMucLoaiTaiSan) {
        this.updateForm(danhMucLoaiTaiSan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucLoaiTaiSan = this.danhMucLoaiTaiSanFormService.getDanhMucLoaiTaiSan(this.editForm);
    if (danhMucLoaiTaiSan.id !== null) {
      this.subscribeToSaveResponse(this.danhMucLoaiTaiSanService.update(danhMucLoaiTaiSan));
    } else {
      this.subscribeToSaveResponse(this.danhMucLoaiTaiSanService.create(danhMucLoaiTaiSan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucLoaiTaiSan>>): void {
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

  protected updateForm(danhMucLoaiTaiSan: IDanhMucLoaiTaiSan): void {
    this.danhMucLoaiTaiSan = danhMucLoaiTaiSan;
    this.danhMucLoaiTaiSanFormService.resetForm(this.editForm, danhMucLoaiTaiSan);
  }
}
