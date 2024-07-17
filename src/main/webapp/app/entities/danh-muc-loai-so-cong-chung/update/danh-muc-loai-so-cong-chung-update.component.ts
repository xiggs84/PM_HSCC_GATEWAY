import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiSoCongChung } from '../danh-muc-loai-so-cong-chung.model';
import { DanhMucLoaiSoCongChungService } from '../service/danh-muc-loai-so-cong-chung.service';
import { DanhMucLoaiSoCongChungFormService, DanhMucLoaiSoCongChungFormGroup } from './danh-muc-loai-so-cong-chung-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-so-cong-chung-update',
  templateUrl: './danh-muc-loai-so-cong-chung-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucLoaiSoCongChungUpdateComponent implements OnInit {
  isSaving = false;
  danhMucLoaiSoCongChung: IDanhMucLoaiSoCongChung | null = null;

  protected danhMucLoaiSoCongChungService = inject(DanhMucLoaiSoCongChungService);
  protected danhMucLoaiSoCongChungFormService = inject(DanhMucLoaiSoCongChungFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucLoaiSoCongChungFormGroup = this.danhMucLoaiSoCongChungFormService.createDanhMucLoaiSoCongChungFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucLoaiSoCongChung }) => {
      this.danhMucLoaiSoCongChung = danhMucLoaiSoCongChung;
      if (danhMucLoaiSoCongChung) {
        this.updateForm(danhMucLoaiSoCongChung);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucLoaiSoCongChung = this.danhMucLoaiSoCongChungFormService.getDanhMucLoaiSoCongChung(this.editForm);
    if (danhMucLoaiSoCongChung.id !== null) {
      this.subscribeToSaveResponse(this.danhMucLoaiSoCongChungService.update(danhMucLoaiSoCongChung));
    } else {
      this.subscribeToSaveResponse(this.danhMucLoaiSoCongChungService.create(danhMucLoaiSoCongChung));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucLoaiSoCongChung>>): void {
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

  protected updateForm(danhMucLoaiSoCongChung: IDanhMucLoaiSoCongChung): void {
    this.danhMucLoaiSoCongChung = danhMucLoaiSoCongChung;
    this.danhMucLoaiSoCongChungFormService.resetForm(this.editForm, danhMucLoaiSoCongChung);
  }
}
