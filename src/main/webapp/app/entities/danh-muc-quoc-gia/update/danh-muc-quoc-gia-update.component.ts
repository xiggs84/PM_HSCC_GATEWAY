import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucQuocGia } from '../danh-muc-quoc-gia.model';
import { DanhMucQuocGiaService } from '../service/danh-muc-quoc-gia.service';
import { DanhMucQuocGiaFormService, DanhMucQuocGiaFormGroup } from './danh-muc-quoc-gia-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-quoc-gia-update',
  templateUrl: './danh-muc-quoc-gia-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucQuocGiaUpdateComponent implements OnInit {
  isSaving = false;
  danhMucQuocGia: IDanhMucQuocGia | null = null;

  protected danhMucQuocGiaService = inject(DanhMucQuocGiaService);
  protected danhMucQuocGiaFormService = inject(DanhMucQuocGiaFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucQuocGiaFormGroup = this.danhMucQuocGiaFormService.createDanhMucQuocGiaFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucQuocGia }) => {
      this.danhMucQuocGia = danhMucQuocGia;
      if (danhMucQuocGia) {
        this.updateForm(danhMucQuocGia);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucQuocGia = this.danhMucQuocGiaFormService.getDanhMucQuocGia(this.editForm);
    if (danhMucQuocGia.id !== null) {
      this.subscribeToSaveResponse(this.danhMucQuocGiaService.update(danhMucQuocGia));
    } else {
      this.subscribeToSaveResponse(this.danhMucQuocGiaService.create(danhMucQuocGia));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucQuocGia>>): void {
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

  protected updateForm(danhMucQuocGia: IDanhMucQuocGia): void {
    this.danhMucQuocGia = danhMucQuocGia;
    this.danhMucQuocGiaFormService.resetForm(this.editForm, danhMucQuocGia);
  }
}
