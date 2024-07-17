import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucCapQuanLy } from '../danh-muc-cap-quan-ly.model';
import { DanhMucCapQuanLyService } from '../service/danh-muc-cap-quan-ly.service';
import { DanhMucCapQuanLyFormService, DanhMucCapQuanLyFormGroup } from './danh-muc-cap-quan-ly-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-cap-quan-ly-update',
  templateUrl: './danh-muc-cap-quan-ly-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucCapQuanLyUpdateComponent implements OnInit {
  isSaving = false;
  danhMucCapQuanLy: IDanhMucCapQuanLy | null = null;

  protected danhMucCapQuanLyService = inject(DanhMucCapQuanLyService);
  protected danhMucCapQuanLyFormService = inject(DanhMucCapQuanLyFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucCapQuanLyFormGroup = this.danhMucCapQuanLyFormService.createDanhMucCapQuanLyFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucCapQuanLy }) => {
      this.danhMucCapQuanLy = danhMucCapQuanLy;
      if (danhMucCapQuanLy) {
        this.updateForm(danhMucCapQuanLy);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucCapQuanLy = this.danhMucCapQuanLyFormService.getDanhMucCapQuanLy(this.editForm);
    if (danhMucCapQuanLy.id !== null) {
      this.subscribeToSaveResponse(this.danhMucCapQuanLyService.update(danhMucCapQuanLy));
    } else {
      this.subscribeToSaveResponse(this.danhMucCapQuanLyService.create(danhMucCapQuanLy));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucCapQuanLy>>): void {
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

  protected updateForm(danhMucCapQuanLy: IDanhMucCapQuanLy): void {
    this.danhMucCapQuanLy = danhMucCapQuanLy;
    this.danhMucCapQuanLyFormService.resetForm(this.editForm, danhMucCapQuanLy);
  }
}
