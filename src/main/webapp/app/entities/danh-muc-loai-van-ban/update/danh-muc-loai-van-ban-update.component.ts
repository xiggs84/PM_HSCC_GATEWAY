import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiVanBan } from '../danh-muc-loai-van-ban.model';
import { DanhMucLoaiVanBanService } from '../service/danh-muc-loai-van-ban.service';
import { DanhMucLoaiVanBanFormService, DanhMucLoaiVanBanFormGroup } from './danh-muc-loai-van-ban-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-van-ban-update',
  templateUrl: './danh-muc-loai-van-ban-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucLoaiVanBanUpdateComponent implements OnInit {
  isSaving = false;
  danhMucLoaiVanBan: IDanhMucLoaiVanBan | null = null;

  protected danhMucLoaiVanBanService = inject(DanhMucLoaiVanBanService);
  protected danhMucLoaiVanBanFormService = inject(DanhMucLoaiVanBanFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucLoaiVanBanFormGroup = this.danhMucLoaiVanBanFormService.createDanhMucLoaiVanBanFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucLoaiVanBan }) => {
      this.danhMucLoaiVanBan = danhMucLoaiVanBan;
      if (danhMucLoaiVanBan) {
        this.updateForm(danhMucLoaiVanBan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucLoaiVanBan = this.danhMucLoaiVanBanFormService.getDanhMucLoaiVanBan(this.editForm);
    if (danhMucLoaiVanBan.id !== null) {
      this.subscribeToSaveResponse(this.danhMucLoaiVanBanService.update(danhMucLoaiVanBan));
    } else {
      this.subscribeToSaveResponse(this.danhMucLoaiVanBanService.create(danhMucLoaiVanBan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucLoaiVanBan>>): void {
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

  protected updateForm(danhMucLoaiVanBan: IDanhMucLoaiVanBan): void {
    this.danhMucLoaiVanBan = danhMucLoaiVanBan;
    this.danhMucLoaiVanBanFormService.resetForm(this.editForm, danhMucLoaiVanBan);
  }
}
