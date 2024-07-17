import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucTinhTrangHonNhan } from 'app/entities/danh-muc-tinh-trang-hon-nhan/danh-muc-tinh-trang-hon-nhan.model';
import { DanhMucTinhTrangHonNhanService } from 'app/entities/danh-muc-tinh-trang-hon-nhan/service/danh-muc-tinh-trang-hon-nhan.service';
import { IDanhMucLoaiDuongSu } from 'app/entities/danh-muc-loai-duong-su/danh-muc-loai-duong-su.model';
import { DanhMucLoaiDuongSuService } from 'app/entities/danh-muc-loai-duong-su/service/danh-muc-loai-duong-su.service';
import { DuongSuService } from '../service/duong-su.service';
import { IDuongSu } from '../duong-su.model';
import { DuongSuFormService, DuongSuFormGroup } from './duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-duong-su-update',
  templateUrl: './duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DuongSuUpdateComponent implements OnInit {
  isSaving = false;
  duongSu: IDuongSu | null = null;

  idTinhTrangsCollection: IDanhMucTinhTrangHonNhan[] = [];
  danhMucLoaiDuongSusSharedCollection: IDanhMucLoaiDuongSu[] = [];

  protected duongSuService = inject(DuongSuService);
  protected duongSuFormService = inject(DuongSuFormService);
  protected danhMucTinhTrangHonNhanService = inject(DanhMucTinhTrangHonNhanService);
  protected danhMucLoaiDuongSuService = inject(DanhMucLoaiDuongSuService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DuongSuFormGroup = this.duongSuFormService.createDuongSuFormGroup();

  compareDanhMucTinhTrangHonNhan = (o1: IDanhMucTinhTrangHonNhan | null, o2: IDanhMucTinhTrangHonNhan | null): boolean =>
    this.danhMucTinhTrangHonNhanService.compareDanhMucTinhTrangHonNhan(o1, o2);

  compareDanhMucLoaiDuongSu = (o1: IDanhMucLoaiDuongSu | null, o2: IDanhMucLoaiDuongSu | null): boolean =>
    this.danhMucLoaiDuongSuService.compareDanhMucLoaiDuongSu(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ duongSu }) => {
      this.duongSu = duongSu;
      if (duongSu) {
        this.updateForm(duongSu);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const duongSu = this.duongSuFormService.getDuongSu(this.editForm);
    if (duongSu.id !== null) {
      this.subscribeToSaveResponse(this.duongSuService.update(duongSu));
    } else {
      this.subscribeToSaveResponse(this.duongSuService.create(duongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDuongSu>>): void {
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

  protected updateForm(duongSu: IDuongSu): void {
    this.duongSu = duongSu;
    this.duongSuFormService.resetForm(this.editForm, duongSu);

    this.idTinhTrangsCollection =
      this.danhMucTinhTrangHonNhanService.addDanhMucTinhTrangHonNhanToCollectionIfMissing<IDanhMucTinhTrangHonNhan>(
        this.idTinhTrangsCollection,
        duongSu.idTinhTrang,
      );
    this.danhMucLoaiDuongSusSharedCollection =
      this.danhMucLoaiDuongSuService.addDanhMucLoaiDuongSuToCollectionIfMissing<IDanhMucLoaiDuongSu>(
        this.danhMucLoaiDuongSusSharedCollection,
        duongSu.idLoaiDs,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.danhMucTinhTrangHonNhanService
      .query({ 'duongSuId.specified': 'false' })
      .pipe(map((res: HttpResponse<IDanhMucTinhTrangHonNhan[]>) => res.body ?? []))
      .pipe(
        map((danhMucTinhTrangHonNhans: IDanhMucTinhTrangHonNhan[]) =>
          this.danhMucTinhTrangHonNhanService.addDanhMucTinhTrangHonNhanToCollectionIfMissing<IDanhMucTinhTrangHonNhan>(
            danhMucTinhTrangHonNhans,
            this.duongSu?.idTinhTrang,
          ),
        ),
      )
      .subscribe((danhMucTinhTrangHonNhans: IDanhMucTinhTrangHonNhan[]) => (this.idTinhTrangsCollection = danhMucTinhTrangHonNhans));

    this.danhMucLoaiDuongSuService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucLoaiDuongSu[]>) => res.body ?? []))
      .pipe(
        map((danhMucLoaiDuongSus: IDanhMucLoaiDuongSu[]) =>
          this.danhMucLoaiDuongSuService.addDanhMucLoaiDuongSuToCollectionIfMissing<IDanhMucLoaiDuongSu>(
            danhMucLoaiDuongSus,
            this.duongSu?.idLoaiDs,
          ),
        ),
      )
      .subscribe((danhMucLoaiDuongSus: IDanhMucLoaiDuongSu[]) => (this.danhMucLoaiDuongSusSharedCollection = danhMucLoaiDuongSus));
  }
}
