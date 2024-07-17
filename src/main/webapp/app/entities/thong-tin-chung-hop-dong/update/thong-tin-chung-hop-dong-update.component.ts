import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IHopDongCongChung } from 'app/entities/hop-dong-cong-chung/hop-dong-cong-chung.model';
import { HopDongCongChungService } from 'app/entities/hop-dong-cong-chung/service/hop-dong-cong-chung.service';
import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from 'app/entities/danh-muc-loai-hop-dong/service/danh-muc-loai-hop-dong.service';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';
import { SoCongChungService } from 'app/entities/so-cong-chung/service/so-cong-chung.service';
import { ThongTinChungHopDongService } from '../service/thong-tin-chung-hop-dong.service';
import { IThongTinChungHopDong } from '../thong-tin-chung-hop-dong.model';
import { ThongTinChungHopDongFormService, ThongTinChungHopDongFormGroup } from './thong-tin-chung-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-thong-tin-chung-hop-dong-update',
  templateUrl: './thong-tin-chung-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ThongTinChungHopDongUpdateComponent implements OnInit {
  isSaving = false;
  thongTinChungHopDong: IThongTinChungHopDong | null = null;

  hopDongCongChungsSharedCollection: IHopDongCongChung[] = [];
  danhMucLoaiHopDongsSharedCollection: IDanhMucLoaiHopDong[] = [];
  soCongChungsSharedCollection: ISoCongChung[] = [];

  protected thongTinChungHopDongService = inject(ThongTinChungHopDongService);
  protected thongTinChungHopDongFormService = inject(ThongTinChungHopDongFormService);
  protected hopDongCongChungService = inject(HopDongCongChungService);
  protected danhMucLoaiHopDongService = inject(DanhMucLoaiHopDongService);
  protected soCongChungService = inject(SoCongChungService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ThongTinChungHopDongFormGroup = this.thongTinChungHopDongFormService.createThongTinChungHopDongFormGroup();

  compareHopDongCongChung = (o1: IHopDongCongChung | null, o2: IHopDongCongChung | null): boolean =>
    this.hopDongCongChungService.compareHopDongCongChung(o1, o2);

  compareDanhMucLoaiHopDong = (o1: IDanhMucLoaiHopDong | null, o2: IDanhMucLoaiHopDong | null): boolean =>
    this.danhMucLoaiHopDongService.compareDanhMucLoaiHopDong(o1, o2);

  compareSoCongChung = (o1: ISoCongChung | null, o2: ISoCongChung | null): boolean => this.soCongChungService.compareSoCongChung(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thongTinChungHopDong }) => {
      this.thongTinChungHopDong = thongTinChungHopDong;
      if (thongTinChungHopDong) {
        this.updateForm(thongTinChungHopDong);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const thongTinChungHopDong = this.thongTinChungHopDongFormService.getThongTinChungHopDong(this.editForm);
    if (thongTinChungHopDong.id !== null) {
      this.subscribeToSaveResponse(this.thongTinChungHopDongService.update(thongTinChungHopDong));
    } else {
      this.subscribeToSaveResponse(this.thongTinChungHopDongService.create(thongTinChungHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IThongTinChungHopDong>>): void {
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

  protected updateForm(thongTinChungHopDong: IThongTinChungHopDong): void {
    this.thongTinChungHopDong = thongTinChungHopDong;
    this.thongTinChungHopDongFormService.resetForm(this.editForm, thongTinChungHopDong);

    this.hopDongCongChungsSharedCollection = this.hopDongCongChungService.addHopDongCongChungToCollectionIfMissing<IHopDongCongChung>(
      this.hopDongCongChungsSharedCollection,
      thongTinChungHopDong.idHopDong,
    );
    this.danhMucLoaiHopDongsSharedCollection =
      this.danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing<IDanhMucLoaiHopDong>(
        this.danhMucLoaiHopDongsSharedCollection,
        thongTinChungHopDong.idLoaiHD,
      );
    this.soCongChungsSharedCollection = this.soCongChungService.addSoCongChungToCollectionIfMissing<ISoCongChung>(
      this.soCongChungsSharedCollection,
      thongTinChungHopDong.idSoCongChung,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.hopDongCongChungService
      .query()
      .pipe(map((res: HttpResponse<IHopDongCongChung[]>) => res.body ?? []))
      .pipe(
        map((hopDongCongChungs: IHopDongCongChung[]) =>
          this.hopDongCongChungService.addHopDongCongChungToCollectionIfMissing<IHopDongCongChung>(
            hopDongCongChungs,
            this.thongTinChungHopDong?.idHopDong,
          ),
        ),
      )
      .subscribe((hopDongCongChungs: IHopDongCongChung[]) => (this.hopDongCongChungsSharedCollection = hopDongCongChungs));

    this.danhMucLoaiHopDongService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucLoaiHopDong[]>) => res.body ?? []))
      .pipe(
        map((danhMucLoaiHopDongs: IDanhMucLoaiHopDong[]) =>
          this.danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing<IDanhMucLoaiHopDong>(
            danhMucLoaiHopDongs,
            this.thongTinChungHopDong?.idLoaiHD,
          ),
        ),
      )
      .subscribe((danhMucLoaiHopDongs: IDanhMucLoaiHopDong[]) => (this.danhMucLoaiHopDongsSharedCollection = danhMucLoaiHopDongs));

    this.soCongChungService
      .query()
      .pipe(map((res: HttpResponse<ISoCongChung[]>) => res.body ?? []))
      .pipe(
        map((soCongChungs: ISoCongChung[]) =>
          this.soCongChungService.addSoCongChungToCollectionIfMissing<ISoCongChung>(soCongChungs, this.thongTinChungHopDong?.idSoCongChung),
        ),
      )
      .subscribe((soCongChungs: ISoCongChung[]) => (this.soCongChungsSharedCollection = soCongChungs));
  }
}
