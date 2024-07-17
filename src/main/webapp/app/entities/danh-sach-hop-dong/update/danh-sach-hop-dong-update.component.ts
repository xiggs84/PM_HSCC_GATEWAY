import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IHopDongCongChung } from 'app/entities/hop-dong-cong-chung/hop-dong-cong-chung.model';
import { HopDongCongChungService } from 'app/entities/hop-dong-cong-chung/service/hop-dong-cong-chung.service';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';
import { SoCongChungService } from 'app/entities/so-cong-chung/service/so-cong-chung.service';
import { DanhSachHopDongService } from '../service/danh-sach-hop-dong.service';
import { IDanhSachHopDong } from '../danh-sach-hop-dong.model';
import { DanhSachHopDongFormService, DanhSachHopDongFormGroup } from './danh-sach-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-hop-dong-update',
  templateUrl: './danh-sach-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhSachHopDongUpdateComponent implements OnInit {
  isSaving = false;
  danhSachHopDong: IDanhSachHopDong | null = null;

  hopDongCongChungsSharedCollection: IHopDongCongChung[] = [];
  soCongChungsSharedCollection: ISoCongChung[] = [];

  protected danhSachHopDongService = inject(DanhSachHopDongService);
  protected danhSachHopDongFormService = inject(DanhSachHopDongFormService);
  protected hopDongCongChungService = inject(HopDongCongChungService);
  protected soCongChungService = inject(SoCongChungService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhSachHopDongFormGroup = this.danhSachHopDongFormService.createDanhSachHopDongFormGroup();

  compareHopDongCongChung = (o1: IHopDongCongChung | null, o2: IHopDongCongChung | null): boolean =>
    this.hopDongCongChungService.compareHopDongCongChung(o1, o2);

  compareSoCongChung = (o1: ISoCongChung | null, o2: ISoCongChung | null): boolean => this.soCongChungService.compareSoCongChung(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhSachHopDong }) => {
      this.danhSachHopDong = danhSachHopDong;
      if (danhSachHopDong) {
        this.updateForm(danhSachHopDong);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhSachHopDong = this.danhSachHopDongFormService.getDanhSachHopDong(this.editForm);
    if (danhSachHopDong.id !== null) {
      this.subscribeToSaveResponse(this.danhSachHopDongService.update(danhSachHopDong));
    } else {
      this.subscribeToSaveResponse(this.danhSachHopDongService.create(danhSachHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhSachHopDong>>): void {
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

  protected updateForm(danhSachHopDong: IDanhSachHopDong): void {
    this.danhSachHopDong = danhSachHopDong;
    this.danhSachHopDongFormService.resetForm(this.editForm, danhSachHopDong);

    this.hopDongCongChungsSharedCollection = this.hopDongCongChungService.addHopDongCongChungToCollectionIfMissing<IHopDongCongChung>(
      this.hopDongCongChungsSharedCollection,
      danhSachHopDong.idHopDong,
    );
    this.soCongChungsSharedCollection = this.soCongChungService.addSoCongChungToCollectionIfMissing<ISoCongChung>(
      this.soCongChungsSharedCollection,
      danhSachHopDong.idSoCongChung,
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
            this.danhSachHopDong?.idHopDong,
          ),
        ),
      )
      .subscribe((hopDongCongChungs: IHopDongCongChung[]) => (this.hopDongCongChungsSharedCollection = hopDongCongChungs));

    this.soCongChungService
      .query()
      .pipe(map((res: HttpResponse<ISoCongChung[]>) => res.body ?? []))
      .pipe(
        map((soCongChungs: ISoCongChung[]) =>
          this.soCongChungService.addSoCongChungToCollectionIfMissing<ISoCongChung>(soCongChungs, this.danhSachHopDong?.idSoCongChung),
        ),
      )
      .subscribe((soCongChungs: ISoCongChung[]) => (this.soCongChungsSharedCollection = soCongChungs));
  }
}
