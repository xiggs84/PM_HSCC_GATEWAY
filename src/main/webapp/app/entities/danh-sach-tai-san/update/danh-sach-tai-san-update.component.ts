import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from 'app/entities/danh-muc-loai-tai-san/service/danh-muc-loai-tai-san.service';
import { IDanhSachTaiSan } from '../danh-sach-tai-san.model';
import { DanhSachTaiSanService } from '../service/danh-sach-tai-san.service';
import { DanhSachTaiSanFormService, DanhSachTaiSanFormGroup } from './danh-sach-tai-san-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-tai-san-update',
  templateUrl: './danh-sach-tai-san-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhSachTaiSanUpdateComponent implements OnInit {
  isSaving = false;
  danhSachTaiSan: IDanhSachTaiSan | null = null;

  danhMucLoaiTaiSansSharedCollection: IDanhMucLoaiTaiSan[] = [];

  protected danhSachTaiSanService = inject(DanhSachTaiSanService);
  protected danhSachTaiSanFormService = inject(DanhSachTaiSanFormService);
  protected danhMucLoaiTaiSanService = inject(DanhMucLoaiTaiSanService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhSachTaiSanFormGroup = this.danhSachTaiSanFormService.createDanhSachTaiSanFormGroup();

  compareDanhMucLoaiTaiSan = (o1: IDanhMucLoaiTaiSan | null, o2: IDanhMucLoaiTaiSan | null): boolean =>
    this.danhMucLoaiTaiSanService.compareDanhMucLoaiTaiSan(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhSachTaiSan }) => {
      this.danhSachTaiSan = danhSachTaiSan;
      if (danhSachTaiSan) {
        this.updateForm(danhSachTaiSan);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhSachTaiSan = this.danhSachTaiSanFormService.getDanhSachTaiSan(this.editForm);
    if (danhSachTaiSan.id !== null) {
      this.subscribeToSaveResponse(this.danhSachTaiSanService.update(danhSachTaiSan));
    } else {
      this.subscribeToSaveResponse(this.danhSachTaiSanService.create(danhSachTaiSan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhSachTaiSan>>): void {
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

  protected updateForm(danhSachTaiSan: IDanhSachTaiSan): void {
    this.danhSachTaiSan = danhSachTaiSan;
    this.danhSachTaiSanFormService.resetForm(this.editForm, danhSachTaiSan);

    this.danhMucLoaiTaiSansSharedCollection = this.danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing<IDanhMucLoaiTaiSan>(
      this.danhMucLoaiTaiSansSharedCollection,
      danhSachTaiSan.idLoaiTs,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.danhMucLoaiTaiSanService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucLoaiTaiSan[]>) => res.body ?? []))
      .pipe(
        map((danhMucLoaiTaiSans: IDanhMucLoaiTaiSan[]) =>
          this.danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing<IDanhMucLoaiTaiSan>(
            danhMucLoaiTaiSans,
            this.danhSachTaiSan?.idLoaiTs,
          ),
        ),
      )
      .subscribe((danhMucLoaiTaiSans: IDanhMucLoaiTaiSan[]) => (this.danhMucLoaiTaiSansSharedCollection = danhMucLoaiTaiSans));
  }
}
