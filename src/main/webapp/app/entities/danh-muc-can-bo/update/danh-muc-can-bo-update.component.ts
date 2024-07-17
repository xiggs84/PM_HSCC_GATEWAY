import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucCanBo } from '../danh-muc-can-bo.model';
import { DanhMucCanBoService } from '../service/danh-muc-can-bo.service';
import { DanhMucCanBoFormService, DanhMucCanBoFormGroup } from './danh-muc-can-bo-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-can-bo-update',
  templateUrl: './danh-muc-can-bo-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucCanBoUpdateComponent implements OnInit {
  isSaving = false;
  danhMucCanBo: IDanhMucCanBo | null = null;

  protected danhMucCanBoService = inject(DanhMucCanBoService);
  protected danhMucCanBoFormService = inject(DanhMucCanBoFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucCanBoFormGroup = this.danhMucCanBoFormService.createDanhMucCanBoFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucCanBo }) => {
      this.danhMucCanBo = danhMucCanBo;
      if (danhMucCanBo) {
        this.updateForm(danhMucCanBo);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucCanBo = this.danhMucCanBoFormService.getDanhMucCanBo(this.editForm);
    if (danhMucCanBo.id !== null) {
      this.subscribeToSaveResponse(this.danhMucCanBoService.update(danhMucCanBo));
    } else {
      this.subscribeToSaveResponse(this.danhMucCanBoService.create(danhMucCanBo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucCanBo>>): void {
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

  protected updateForm(danhMucCanBo: IDanhMucCanBo): void {
    this.danhMucCanBo = danhMucCanBo;
    this.danhMucCanBoFormService.resetForm(this.editForm, danhMucCanBo);
  }
}
