import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICauHinhThongTinLoaiTaiSan } from '../cau-hinh-thong-tin-loai-tai-san.model';
import { CauHinhThongTinLoaiTaiSanService } from '../service/cau-hinh-thong-tin-loai-tai-san.service';
import { CauHinhThongTinLoaiTaiSanFormService, CauHinhThongTinLoaiTaiSanFormGroup } from './cau-hinh-thong-tin-loai-tai-san-form.service';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-thong-tin-loai-tai-san-update',
  templateUrl: './cau-hinh-thong-tin-loai-tai-san-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CauHinhThongTinLoaiTaiSanUpdateComponent implements OnInit {
  isSaving = false;
  cauHinhThongTinLoaiTaiSan: ICauHinhThongTinLoaiTaiSan | null = null;

  protected cauHinhThongTinLoaiTaiSanService = inject(CauHinhThongTinLoaiTaiSanService);
  protected cauHinhThongTinLoaiTaiSanFormService = inject(CauHinhThongTinLoaiTaiSanFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CauHinhThongTinLoaiTaiSanFormGroup = this.cauHinhThongTinLoaiTaiSanFormService.createCauHinhThongTinLoaiTaiSanFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cauHinhThongTinLoaiTaiSan }) => {
      this.cauHinhThongTinLoaiTaiSan = cauHinhThongTinLoaiTaiSan;
      if (cauHinhThongTinLoaiTaiSan) {
        this.updateForm(cauHinhThongTinLoaiTaiSan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cauHinhThongTinLoaiTaiSan = this.cauHinhThongTinLoaiTaiSanFormService.getCauHinhThongTinLoaiTaiSan(this.editForm);
    if (cauHinhThongTinLoaiTaiSan.id !== null) {
      this.subscribeToSaveResponse(this.cauHinhThongTinLoaiTaiSanService.update(cauHinhThongTinLoaiTaiSan));
    } else {
      this.subscribeToSaveResponse(this.cauHinhThongTinLoaiTaiSanService.create(cauHinhThongTinLoaiTaiSan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICauHinhThongTinLoaiTaiSan>>): void {
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

  protected updateForm(cauHinhThongTinLoaiTaiSan: ICauHinhThongTinLoaiTaiSan): void {
    this.cauHinhThongTinLoaiTaiSan = cauHinhThongTinLoaiTaiSan;
    this.cauHinhThongTinLoaiTaiSanFormService.resetForm(this.editForm, cauHinhThongTinLoaiTaiSan);
  }
}
