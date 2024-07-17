import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITinhTrangTaiSan } from '../tinh-trang-tai-san.model';
import { TinhTrangTaiSanService } from '../service/tinh-trang-tai-san.service';
import { TinhTrangTaiSanFormService, TinhTrangTaiSanFormGroup } from './tinh-trang-tai-san-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tinh-trang-tai-san-update',
  templateUrl: './tinh-trang-tai-san-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TinhTrangTaiSanUpdateComponent implements OnInit {
  isSaving = false;
  tinhTrangTaiSan: ITinhTrangTaiSan | null = null;

  protected tinhTrangTaiSanService = inject(TinhTrangTaiSanService);
  protected tinhTrangTaiSanFormService = inject(TinhTrangTaiSanFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TinhTrangTaiSanFormGroup = this.tinhTrangTaiSanFormService.createTinhTrangTaiSanFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tinhTrangTaiSan }) => {
      this.tinhTrangTaiSan = tinhTrangTaiSan;
      if (tinhTrangTaiSan) {
        this.updateForm(tinhTrangTaiSan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tinhTrangTaiSan = this.tinhTrangTaiSanFormService.getTinhTrangTaiSan(this.editForm);
    if (tinhTrangTaiSan.id !== null) {
      this.subscribeToSaveResponse(this.tinhTrangTaiSanService.update(tinhTrangTaiSan));
    } else {
      this.subscribeToSaveResponse(this.tinhTrangTaiSanService.create(tinhTrangTaiSan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITinhTrangTaiSan>>): void {
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

  protected updateForm(tinhTrangTaiSan: ITinhTrangTaiSan): void {
    this.tinhTrangTaiSan = tinhTrangTaiSan;
    this.tinhTrangTaiSanFormService.resetForm(this.editForm, tinhTrangTaiSan);
  }
}
