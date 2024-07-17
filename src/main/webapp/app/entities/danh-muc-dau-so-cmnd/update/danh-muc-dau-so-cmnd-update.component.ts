import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucDauSoCmnd } from '../danh-muc-dau-so-cmnd.model';
import { DanhMucDauSoCmndService } from '../service/danh-muc-dau-so-cmnd.service';
import { DanhMucDauSoCmndFormService, DanhMucDauSoCmndFormGroup } from './danh-muc-dau-so-cmnd-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-dau-so-cmnd-update',
  templateUrl: './danh-muc-dau-so-cmnd-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucDauSoCmndUpdateComponent implements OnInit {
  isSaving = false;
  danhMucDauSoCmnd: IDanhMucDauSoCmnd | null = null;

  protected danhMucDauSoCmndService = inject(DanhMucDauSoCmndService);
  protected danhMucDauSoCmndFormService = inject(DanhMucDauSoCmndFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucDauSoCmndFormGroup = this.danhMucDauSoCmndFormService.createDanhMucDauSoCmndFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucDauSoCmnd }) => {
      this.danhMucDauSoCmnd = danhMucDauSoCmnd;
      if (danhMucDauSoCmnd) {
        this.updateForm(danhMucDauSoCmnd);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucDauSoCmnd = this.danhMucDauSoCmndFormService.getDanhMucDauSoCmnd(this.editForm);
    if (danhMucDauSoCmnd.id !== null) {
      this.subscribeToSaveResponse(this.danhMucDauSoCmndService.update(danhMucDauSoCmnd));
    } else {
      this.subscribeToSaveResponse(this.danhMucDauSoCmndService.create(danhMucDauSoCmnd));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucDauSoCmnd>>): void {
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

  protected updateForm(danhMucDauSoCmnd: IDanhMucDauSoCmnd): void {
    this.danhMucDauSoCmnd = danhMucDauSoCmnd;
    this.danhMucDauSoCmndFormService.resetForm(this.editForm, danhMucDauSoCmnd);
  }
}
