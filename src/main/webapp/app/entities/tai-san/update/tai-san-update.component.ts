import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from 'app/entities/danh-muc-loai-tai-san/service/danh-muc-loai-tai-san.service';
import { ITinhTrangTaiSan } from 'app/entities/tinh-trang-tai-san/tinh-trang-tai-san.model';
import { TinhTrangTaiSanService } from 'app/entities/tinh-trang-tai-san/service/tinh-trang-tai-san.service';
import { TaiSanService } from '../service/tai-san.service';
import { ITaiSan } from '../tai-san.model';
import { TaiSanFormService, TaiSanFormGroup } from './tai-san-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tai-san-update',
  templateUrl: './tai-san-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaiSanUpdateComponent implements OnInit {
  isSaving = false;
  taiSan: ITaiSan | null = null;

  taiSansSharedCollection: ITaiSan[] = [];
  danhMucLoaiTaiSansSharedCollection: IDanhMucLoaiTaiSan[] = [];
  tinhTrangTaiSansSharedCollection: ITinhTrangTaiSan[] = [];

  protected taiSanService = inject(TaiSanService);
  protected taiSanFormService = inject(TaiSanFormService);
  protected danhMucLoaiTaiSanService = inject(DanhMucLoaiTaiSanService);
  protected tinhTrangTaiSanService = inject(TinhTrangTaiSanService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaiSanFormGroup = this.taiSanFormService.createTaiSanFormGroup();

  compareTaiSan = (o1: ITaiSan | null, o2: ITaiSan | null): boolean => this.taiSanService.compareTaiSan(o1, o2);

  compareDanhMucLoaiTaiSan = (o1: IDanhMucLoaiTaiSan | null, o2: IDanhMucLoaiTaiSan | null): boolean =>
    this.danhMucLoaiTaiSanService.compareDanhMucLoaiTaiSan(o1, o2);

  compareTinhTrangTaiSan = (o1: ITinhTrangTaiSan | null, o2: ITinhTrangTaiSan | null): boolean =>
    this.tinhTrangTaiSanService.compareTinhTrangTaiSan(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taiSan }) => {
      this.taiSan = taiSan;
      if (taiSan) {
        this.updateForm(taiSan);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taiSan = this.taiSanFormService.getTaiSan(this.editForm);
    if (taiSan.id !== null) {
      this.subscribeToSaveResponse(this.taiSanService.update(taiSan));
    } else {
      this.subscribeToSaveResponse(this.taiSanService.create(taiSan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaiSan>>): void {
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

  protected updateForm(taiSan: ITaiSan): void {
    this.taiSan = taiSan;
    this.taiSanFormService.resetForm(this.editForm, taiSan);

    this.taiSansSharedCollection = this.taiSanService.addTaiSanToCollectionIfMissing<ITaiSan>(
      this.taiSansSharedCollection,
      ...(taiSan.idTsGocs ?? []),
      ...(taiSan.taiSans ?? []),
    );
    this.danhMucLoaiTaiSansSharedCollection = this.danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing<IDanhMucLoaiTaiSan>(
      this.danhMucLoaiTaiSansSharedCollection,
      taiSan.idLoaiTs,
    );
    this.tinhTrangTaiSansSharedCollection = this.tinhTrangTaiSanService.addTinhTrangTaiSanToCollectionIfMissing<ITinhTrangTaiSan>(
      this.tinhTrangTaiSansSharedCollection,
      taiSan.idTinhTrang,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.taiSanService
      .query()
      .pipe(map((res: HttpResponse<ITaiSan[]>) => res.body ?? []))
      .pipe(
        map((taiSans: ITaiSan[]) =>
          this.taiSanService.addTaiSanToCollectionIfMissing<ITaiSan>(
            taiSans,
            ...(this.taiSan?.idTsGocs ?? []),
            ...(this.taiSan?.taiSans ?? []),
          ),
        ),
      )
      .subscribe((taiSans: ITaiSan[]) => (this.taiSansSharedCollection = taiSans));

    this.danhMucLoaiTaiSanService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucLoaiTaiSan[]>) => res.body ?? []))
      .pipe(
        map((danhMucLoaiTaiSans: IDanhMucLoaiTaiSan[]) =>
          this.danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing<IDanhMucLoaiTaiSan>(
            danhMucLoaiTaiSans,
            this.taiSan?.idLoaiTs,
          ),
        ),
      )
      .subscribe((danhMucLoaiTaiSans: IDanhMucLoaiTaiSan[]) => (this.danhMucLoaiTaiSansSharedCollection = danhMucLoaiTaiSans));

    this.tinhTrangTaiSanService
      .query()
      .pipe(map((res: HttpResponse<ITinhTrangTaiSan[]>) => res.body ?? []))
      .pipe(
        map((tinhTrangTaiSans: ITinhTrangTaiSan[]) =>
          this.tinhTrangTaiSanService.addTinhTrangTaiSanToCollectionIfMissing<ITinhTrangTaiSan>(tinhTrangTaiSans, this.taiSan?.idTinhTrang),
        ),
      )
      .subscribe((tinhTrangTaiSans: ITinhTrangTaiSan[]) => (this.tinhTrangTaiSansSharedCollection = tinhTrangTaiSans));
  }
}
