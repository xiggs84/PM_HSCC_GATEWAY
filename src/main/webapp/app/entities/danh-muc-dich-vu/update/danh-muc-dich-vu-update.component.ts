import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucDichVu } from '../danh-muc-dich-vu.model';
import { DanhMucDichVuService } from '../service/danh-muc-dich-vu.service';
import { DanhMucDichVuFormService, DanhMucDichVuFormGroup } from './danh-muc-dich-vu-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-dich-vu-update',
  templateUrl: './danh-muc-dich-vu-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucDichVuUpdateComponent implements OnInit {
  isSaving = false;
  danhMucDichVu: IDanhMucDichVu | null = null;

  protected danhMucDichVuService = inject(DanhMucDichVuService);
  protected danhMucDichVuFormService = inject(DanhMucDichVuFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucDichVuFormGroup = this.danhMucDichVuFormService.createDanhMucDichVuFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucDichVu }) => {
      this.danhMucDichVu = danhMucDichVu;
      if (danhMucDichVu) {
        this.updateForm(danhMucDichVu);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucDichVu = this.danhMucDichVuFormService.getDanhMucDichVu(this.editForm);
    if (danhMucDichVu.id !== null) {
      this.subscribeToSaveResponse(this.danhMucDichVuService.update(danhMucDichVu));
    } else {
      this.subscribeToSaveResponse(this.danhMucDichVuService.create(danhMucDichVu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucDichVu>>): void {
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

  protected updateForm(danhMucDichVu: IDanhMucDichVu): void {
    this.danhMucDichVu = danhMucDichVu;
    this.danhMucDichVuFormService.resetForm(this.editForm, danhMucDichVu);
  }
}
