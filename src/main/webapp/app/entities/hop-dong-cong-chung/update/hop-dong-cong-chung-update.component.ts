import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from 'app/entities/danh-muc-loai-hop-dong/service/danh-muc-loai-hop-dong.service';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';
import { SoCongChungService } from 'app/entities/so-cong-chung/service/so-cong-chung.service';
import { HopDongCongChungService } from '../service/hop-dong-cong-chung.service';
import { IHopDongCongChung } from '../hop-dong-cong-chung.model';
import { HopDongCongChungFormService, HopDongCongChungFormGroup } from './hop-dong-cong-chung-form.service';

@Component({
  standalone: true,
  selector: 'jhi-hop-dong-cong-chung-update',
  templateUrl: './hop-dong-cong-chung-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class HopDongCongChungUpdateComponent implements OnInit {
  isSaving = false;
  hopDongCongChung: IHopDongCongChung | null = null;

  danhMucLoaiHopDongsSharedCollection: IDanhMucLoaiHopDong[] = [];
  soCongChungsSharedCollection: ISoCongChung[] = [];

  protected hopDongCongChungService = inject(HopDongCongChungService);
  protected hopDongCongChungFormService = inject(HopDongCongChungFormService);
  protected danhMucLoaiHopDongService = inject(DanhMucLoaiHopDongService);
  protected soCongChungService = inject(SoCongChungService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: HopDongCongChungFormGroup = this.hopDongCongChungFormService.createHopDongCongChungFormGroup();

  compareDanhMucLoaiHopDong = (o1: IDanhMucLoaiHopDong | null, o2: IDanhMucLoaiHopDong | null): boolean =>
    this.danhMucLoaiHopDongService.compareDanhMucLoaiHopDong(o1, o2);

  compareSoCongChung = (o1: ISoCongChung | null, o2: ISoCongChung | null): boolean => this.soCongChungService.compareSoCongChung(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hopDongCongChung }) => {
      this.hopDongCongChung = hopDongCongChung;
      if (hopDongCongChung) {
        this.updateForm(hopDongCongChung);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hopDongCongChung = this.hopDongCongChungFormService.getHopDongCongChung(this.editForm);
    if (hopDongCongChung.id !== null) {
      this.subscribeToSaveResponse(this.hopDongCongChungService.update(hopDongCongChung));
    } else {
      this.subscribeToSaveResponse(this.hopDongCongChungService.create(hopDongCongChung));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHopDongCongChung>>): void {
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

  protected updateForm(hopDongCongChung: IHopDongCongChung): void {
    this.hopDongCongChung = hopDongCongChung;
    this.hopDongCongChungFormService.resetForm(this.editForm, hopDongCongChung);

    this.danhMucLoaiHopDongsSharedCollection =
      this.danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing<IDanhMucLoaiHopDong>(
        this.danhMucLoaiHopDongsSharedCollection,
        hopDongCongChung.idLoaiHD,
      );
    this.soCongChungsSharedCollection = this.soCongChungService.addSoCongChungToCollectionIfMissing<ISoCongChung>(
      this.soCongChungsSharedCollection,
      hopDongCongChung.idSoCongChung,
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
            this.hopDongCongChung?.idLoaiHD,
          ),
        ),
      )
      .subscribe((danhMucLoaiHopDongs: IDanhMucLoaiHopDong[]) => (this.danhMucLoaiHopDongsSharedCollection = danhMucLoaiHopDongs));

    this.soCongChungService
      .query()
      .pipe(map((res: HttpResponse<ISoCongChung[]>) => res.body ?? []))
      .pipe(
        map((soCongChungs: ISoCongChung[]) =>
          this.soCongChungService.addSoCongChungToCollectionIfMissing<ISoCongChung>(soCongChungs, this.hopDongCongChung?.idSoCongChung),
        ),
      )
      .subscribe((soCongChungs: ISoCongChung[]) => (this.soCongChungsSharedCollection = soCongChungs));
  }
}
