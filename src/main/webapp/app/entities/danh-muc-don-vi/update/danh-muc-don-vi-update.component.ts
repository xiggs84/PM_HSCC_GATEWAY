import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucTinh } from 'app/entities/danh-muc-tinh/danh-muc-tinh.model';
import { DanhMucTinhService } from 'app/entities/danh-muc-tinh/service/danh-muc-tinh.service';
import { IDanhMucHuyen } from 'app/entities/danh-muc-huyen/danh-muc-huyen.model';
import { DanhMucHuyenService } from 'app/entities/danh-muc-huyen/service/danh-muc-huyen.service';
import { IDanhMucXa } from 'app/entities/danh-muc-xa/danh-muc-xa.model';
import { DanhMucXaService } from 'app/entities/danh-muc-xa/service/danh-muc-xa.service';
import { IDanhMucLoaiDonVi } from 'app/entities/danh-muc-loai-don-vi/danh-muc-loai-don-vi.model';
import { DanhMucLoaiDonViService } from 'app/entities/danh-muc-loai-don-vi/service/danh-muc-loai-don-vi.service';
import { DanhMucDonViService } from '../service/danh-muc-don-vi.service';
import { IDanhMucDonVi } from '../danh-muc-don-vi.model';
import { DanhMucDonViFormService, DanhMucDonViFormGroup } from './danh-muc-don-vi-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-don-vi-update',
  templateUrl: './danh-muc-don-vi-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucDonViUpdateComponent implements OnInit {
  isSaving = false;
  danhMucDonVi: IDanhMucDonVi | null = null;

  danhMucTinhsSharedCollection: IDanhMucTinh[] = [];
  danhMucHuyensSharedCollection: IDanhMucHuyen[] = [];
  danhMucXasSharedCollection: IDanhMucXa[] = [];
  danhMucLoaiDonVisSharedCollection: IDanhMucLoaiDonVi[] = [];

  protected danhMucDonViService = inject(DanhMucDonViService);
  protected danhMucDonViFormService = inject(DanhMucDonViFormService);
  protected danhMucTinhService = inject(DanhMucTinhService);
  protected danhMucHuyenService = inject(DanhMucHuyenService);
  protected danhMucXaService = inject(DanhMucXaService);
  protected danhMucLoaiDonViService = inject(DanhMucLoaiDonViService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucDonViFormGroup = this.danhMucDonViFormService.createDanhMucDonViFormGroup();

  compareDanhMucTinh = (o1: IDanhMucTinh | null, o2: IDanhMucTinh | null): boolean => this.danhMucTinhService.compareDanhMucTinh(o1, o2);

  compareDanhMucHuyen = (o1: IDanhMucHuyen | null, o2: IDanhMucHuyen | null): boolean =>
    this.danhMucHuyenService.compareDanhMucHuyen(o1, o2);

  compareDanhMucXa = (o1: IDanhMucXa | null, o2: IDanhMucXa | null): boolean => this.danhMucXaService.compareDanhMucXa(o1, o2);

  compareDanhMucLoaiDonVi = (o1: IDanhMucLoaiDonVi | null, o2: IDanhMucLoaiDonVi | null): boolean =>
    this.danhMucLoaiDonViService.compareDanhMucLoaiDonVi(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucDonVi }) => {
      this.danhMucDonVi = danhMucDonVi;
      if (danhMucDonVi) {
        this.updateForm(danhMucDonVi);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucDonVi = this.danhMucDonViFormService.getDanhMucDonVi(this.editForm);
    if (danhMucDonVi.id !== null) {
      this.subscribeToSaveResponse(this.danhMucDonViService.update(danhMucDonVi));
    } else {
      this.subscribeToSaveResponse(this.danhMucDonViService.create(danhMucDonVi));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucDonVi>>): void {
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

  protected updateForm(danhMucDonVi: IDanhMucDonVi): void {
    this.danhMucDonVi = danhMucDonVi;
    this.danhMucDonViFormService.resetForm(this.editForm, danhMucDonVi);

    this.danhMucTinhsSharedCollection = this.danhMucTinhService.addDanhMucTinhToCollectionIfMissing<IDanhMucTinh>(
      this.danhMucTinhsSharedCollection,
      danhMucDonVi.idTinh,
    );
    this.danhMucHuyensSharedCollection = this.danhMucHuyenService.addDanhMucHuyenToCollectionIfMissing<IDanhMucHuyen>(
      this.danhMucHuyensSharedCollection,
      danhMucDonVi.idHuyen,
    );
    this.danhMucXasSharedCollection = this.danhMucXaService.addDanhMucXaToCollectionIfMissing<IDanhMucXa>(
      this.danhMucXasSharedCollection,
      danhMucDonVi.idPhuongXa,
    );
    this.danhMucLoaiDonVisSharedCollection = this.danhMucLoaiDonViService.addDanhMucLoaiDonViToCollectionIfMissing<IDanhMucLoaiDonVi>(
      this.danhMucLoaiDonVisSharedCollection,
      danhMucDonVi.idLoaiDv,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.danhMucTinhService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucTinh[]>) => res.body ?? []))
      .pipe(
        map((danhMucTinhs: IDanhMucTinh[]) =>
          this.danhMucTinhService.addDanhMucTinhToCollectionIfMissing<IDanhMucTinh>(danhMucTinhs, this.danhMucDonVi?.idTinh),
        ),
      )
      .subscribe((danhMucTinhs: IDanhMucTinh[]) => (this.danhMucTinhsSharedCollection = danhMucTinhs));

    this.danhMucHuyenService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucHuyen[]>) => res.body ?? []))
      .pipe(
        map((danhMucHuyens: IDanhMucHuyen[]) =>
          this.danhMucHuyenService.addDanhMucHuyenToCollectionIfMissing<IDanhMucHuyen>(danhMucHuyens, this.danhMucDonVi?.idHuyen),
        ),
      )
      .subscribe((danhMucHuyens: IDanhMucHuyen[]) => (this.danhMucHuyensSharedCollection = danhMucHuyens));

    this.danhMucXaService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucXa[]>) => res.body ?? []))
      .pipe(
        map((danhMucXas: IDanhMucXa[]) =>
          this.danhMucXaService.addDanhMucXaToCollectionIfMissing<IDanhMucXa>(danhMucXas, this.danhMucDonVi?.idPhuongXa),
        ),
      )
      .subscribe((danhMucXas: IDanhMucXa[]) => (this.danhMucXasSharedCollection = danhMucXas));

    this.danhMucLoaiDonViService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucLoaiDonVi[]>) => res.body ?? []))
      .pipe(
        map((danhMucLoaiDonVis: IDanhMucLoaiDonVi[]) =>
          this.danhMucLoaiDonViService.addDanhMucLoaiDonViToCollectionIfMissing<IDanhMucLoaiDonVi>(
            danhMucLoaiDonVis,
            this.danhMucDonVi?.idLoaiDv,
          ),
        ),
      )
      .subscribe((danhMucLoaiDonVis: IDanhMucLoaiDonVi[]) => (this.danhMucLoaiDonVisSharedCollection = danhMucLoaiDonVis));
  }
}
