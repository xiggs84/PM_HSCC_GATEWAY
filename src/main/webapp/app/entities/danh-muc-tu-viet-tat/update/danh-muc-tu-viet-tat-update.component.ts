import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucTuVietTat } from '../danh-muc-tu-viet-tat.model';
import { DanhMucTuVietTatService } from '../service/danh-muc-tu-viet-tat.service';
import { DanhMucTuVietTatFormService, DanhMucTuVietTatFormGroup } from './danh-muc-tu-viet-tat-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-tu-viet-tat-update',
  templateUrl: './danh-muc-tu-viet-tat-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucTuVietTatUpdateComponent implements OnInit {
  isSaving = false;
  danhMucTuVietTat: IDanhMucTuVietTat | null = null;

  protected danhMucTuVietTatService = inject(DanhMucTuVietTatService);
  protected danhMucTuVietTatFormService = inject(DanhMucTuVietTatFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucTuVietTatFormGroup = this.danhMucTuVietTatFormService.createDanhMucTuVietTatFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucTuVietTat }) => {
      this.danhMucTuVietTat = danhMucTuVietTat;
      if (danhMucTuVietTat) {
        this.updateForm(danhMucTuVietTat);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucTuVietTat = this.danhMucTuVietTatFormService.getDanhMucTuVietTat(this.editForm);
    if (danhMucTuVietTat.id !== null) {
      this.subscribeToSaveResponse(this.danhMucTuVietTatService.update(danhMucTuVietTat));
    } else {
      this.subscribeToSaveResponse(this.danhMucTuVietTatService.create(danhMucTuVietTat));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucTuVietTat>>): void {
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

  protected updateForm(danhMucTuVietTat: IDanhMucTuVietTat): void {
    this.danhMucTuVietTat = danhMucTuVietTat;
    this.danhMucTuVietTatFormService.resetForm(this.editForm, danhMucTuVietTat);
  }
}
