import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucVaiTro } from '../danh-muc-vai-tro.model';
import { DanhMucVaiTroService } from '../service/danh-muc-vai-tro.service';
import { DanhMucVaiTroFormService, DanhMucVaiTroFormGroup } from './danh-muc-vai-tro-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-vai-tro-update',
  templateUrl: './danh-muc-vai-tro-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucVaiTroUpdateComponent implements OnInit {
  isSaving = false;
  danhMucVaiTro: IDanhMucVaiTro | null = null;

  protected danhMucVaiTroService = inject(DanhMucVaiTroService);
  protected danhMucVaiTroFormService = inject(DanhMucVaiTroFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucVaiTroFormGroup = this.danhMucVaiTroFormService.createDanhMucVaiTroFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucVaiTro }) => {
      this.danhMucVaiTro = danhMucVaiTro;
      if (danhMucVaiTro) {
        this.updateForm(danhMucVaiTro);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucVaiTro = this.danhMucVaiTroFormService.getDanhMucVaiTro(this.editForm);
    if (danhMucVaiTro.id !== null) {
      this.subscribeToSaveResponse(this.danhMucVaiTroService.update(danhMucVaiTro));
    } else {
      this.subscribeToSaveResponse(this.danhMucVaiTroService.create(danhMucVaiTro));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucVaiTro>>): void {
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

  protected updateForm(danhMucVaiTro: IDanhMucVaiTro): void {
    this.danhMucVaiTro = danhMucVaiTro;
    this.danhMucVaiTroFormService.resetForm(this.editForm, danhMucVaiTro);
  }
}
