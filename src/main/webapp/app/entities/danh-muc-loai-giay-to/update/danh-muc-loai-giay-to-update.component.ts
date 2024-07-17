import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiGiayTo } from '../danh-muc-loai-giay-to.model';
import { DanhMucLoaiGiayToService } from '../service/danh-muc-loai-giay-to.service';
import { DanhMucLoaiGiayToFormService, DanhMucLoaiGiayToFormGroup } from './danh-muc-loai-giay-to-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-giay-to-update',
  templateUrl: './danh-muc-loai-giay-to-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucLoaiGiayToUpdateComponent implements OnInit {
  isSaving = false;
  danhMucLoaiGiayTo: IDanhMucLoaiGiayTo | null = null;

  protected danhMucLoaiGiayToService = inject(DanhMucLoaiGiayToService);
  protected danhMucLoaiGiayToFormService = inject(DanhMucLoaiGiayToFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucLoaiGiayToFormGroup = this.danhMucLoaiGiayToFormService.createDanhMucLoaiGiayToFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucLoaiGiayTo }) => {
      this.danhMucLoaiGiayTo = danhMucLoaiGiayTo;
      if (danhMucLoaiGiayTo) {
        this.updateForm(danhMucLoaiGiayTo);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucLoaiGiayTo = this.danhMucLoaiGiayToFormService.getDanhMucLoaiGiayTo(this.editForm);
    if (danhMucLoaiGiayTo.id !== null) {
      this.subscribeToSaveResponse(this.danhMucLoaiGiayToService.update(danhMucLoaiGiayTo));
    } else {
      this.subscribeToSaveResponse(this.danhMucLoaiGiayToService.create(danhMucLoaiGiayTo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucLoaiGiayTo>>): void {
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

  protected updateForm(danhMucLoaiGiayTo: IDanhMucLoaiGiayTo): void {
    this.danhMucLoaiGiayTo = danhMucLoaiGiayTo;
    this.danhMucLoaiGiayToFormService.resetForm(this.editForm, danhMucLoaiGiayTo);
  }
}
