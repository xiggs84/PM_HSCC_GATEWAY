import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from 'app/entities/danh-muc-loai-hop-dong/service/danh-muc-loai-hop-dong.service';
import { IPhanLoaiHopDong } from 'app/entities/phan-loai-hop-dong/phan-loai-hop-dong.model';
import { PhanLoaiHopDongService } from 'app/entities/phan-loai-hop-dong/service/phan-loai-hop-dong.service';
import { CauHinhMauHopDongService } from '../service/cau-hinh-mau-hop-dong.service';
import { ICauHinhMauHopDong } from '../cau-hinh-mau-hop-dong.model';
import { CauHinhMauHopDongFormService, CauHinhMauHopDongFormGroup } from './cau-hinh-mau-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-mau-hop-dong-update',
  templateUrl: './cau-hinh-mau-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CauHinhMauHopDongUpdateComponent implements OnInit {
  isSaving = false;
  cauHinhMauHopDong: ICauHinhMauHopDong | null = null;

  danhMucLoaiHopDongsSharedCollection: IDanhMucLoaiHopDong[] = [];
  phanLoaiHopDongsSharedCollection: IPhanLoaiHopDong[] = [];

  protected cauHinhMauHopDongService = inject(CauHinhMauHopDongService);
  protected cauHinhMauHopDongFormService = inject(CauHinhMauHopDongFormService);
  protected danhMucLoaiHopDongService = inject(DanhMucLoaiHopDongService);
  protected phanLoaiHopDongService = inject(PhanLoaiHopDongService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CauHinhMauHopDongFormGroup = this.cauHinhMauHopDongFormService.createCauHinhMauHopDongFormGroup();

  compareDanhMucLoaiHopDong = (o1: IDanhMucLoaiHopDong | null, o2: IDanhMucLoaiHopDong | null): boolean =>
    this.danhMucLoaiHopDongService.compareDanhMucLoaiHopDong(o1, o2);

  comparePhanLoaiHopDong = (o1: IPhanLoaiHopDong | null, o2: IPhanLoaiHopDong | null): boolean =>
    this.phanLoaiHopDongService.comparePhanLoaiHopDong(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cauHinhMauHopDong }) => {
      this.cauHinhMauHopDong = cauHinhMauHopDong;
      if (cauHinhMauHopDong) {
        this.updateForm(cauHinhMauHopDong);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cauHinhMauHopDong = this.cauHinhMauHopDongFormService.getCauHinhMauHopDong(this.editForm);
    if (cauHinhMauHopDong.id !== null) {
      this.subscribeToSaveResponse(this.cauHinhMauHopDongService.update(cauHinhMauHopDong));
    } else {
      this.subscribeToSaveResponse(this.cauHinhMauHopDongService.create(cauHinhMauHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICauHinhMauHopDong>>): void {
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

  protected updateForm(cauHinhMauHopDong: ICauHinhMauHopDong): void {
    this.cauHinhMauHopDong = cauHinhMauHopDong;
    this.cauHinhMauHopDongFormService.resetForm(this.editForm, cauHinhMauHopDong);

    this.danhMucLoaiHopDongsSharedCollection =
      this.danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing<IDanhMucLoaiHopDong>(
        this.danhMucLoaiHopDongsSharedCollection,
        cauHinhMauHopDong.idLoaiHD,
      );
    this.phanLoaiHopDongsSharedCollection = this.phanLoaiHopDongService.addPhanLoaiHopDongToCollectionIfMissing<IPhanLoaiHopDong>(
      this.phanLoaiHopDongsSharedCollection,
      cauHinhMauHopDong.idPhanLoaiHD,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.danhMucLoaiHopDongService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucLoaiHopDong[]>) => res.body ?? []))
      .pipe(
        map((danhMucLoaiHopDongs: IDanhMucLoaiHopDong[]) =>
          this.danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing<IDanhMucLoaiHopDong>(
            danhMucLoaiHopDongs,
            this.cauHinhMauHopDong?.idLoaiHD,
          ),
        ),
      )
      .subscribe((danhMucLoaiHopDongs: IDanhMucLoaiHopDong[]) => (this.danhMucLoaiHopDongsSharedCollection = danhMucLoaiHopDongs));

    this.phanLoaiHopDongService
      .query()
      .pipe(map((res: HttpResponse<IPhanLoaiHopDong[]>) => res.body ?? []))
      .pipe(
        map((phanLoaiHopDongs: IPhanLoaiHopDong[]) =>
          this.phanLoaiHopDongService.addPhanLoaiHopDongToCollectionIfMissing<IPhanLoaiHopDong>(
            phanLoaiHopDongs,
            this.cauHinhMauHopDong?.idPhanLoaiHD,
          ),
        ),
      )
      .subscribe((phanLoaiHopDongs: IPhanLoaiHopDong[]) => (this.phanLoaiHopDongsSharedCollection = phanLoaiHopDongs));
  }
}
