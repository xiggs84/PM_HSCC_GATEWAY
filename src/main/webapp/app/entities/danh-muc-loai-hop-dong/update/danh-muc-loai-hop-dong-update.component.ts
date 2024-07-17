import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiHopDong } from '../danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from '../service/danh-muc-loai-hop-dong.service';
import { DanhMucLoaiHopDongFormService, DanhMucLoaiHopDongFormGroup } from './danh-muc-loai-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-hop-dong-update',
  templateUrl: './danh-muc-loai-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucLoaiHopDongUpdateComponent implements OnInit {
  isSaving = false;
  danhMucLoaiHopDong: IDanhMucLoaiHopDong | null = null;

  protected danhMucLoaiHopDongService = inject(DanhMucLoaiHopDongService);
  protected danhMucLoaiHopDongFormService = inject(DanhMucLoaiHopDongFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucLoaiHopDongFormGroup = this.danhMucLoaiHopDongFormService.createDanhMucLoaiHopDongFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucLoaiHopDong }) => {
      this.danhMucLoaiHopDong = danhMucLoaiHopDong;
      if (danhMucLoaiHopDong) {
        this.updateForm(danhMucLoaiHopDong);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucLoaiHopDong = this.danhMucLoaiHopDongFormService.getDanhMucLoaiHopDong(this.editForm);
    if (danhMucLoaiHopDong.id !== null) {
      this.subscribeToSaveResponse(this.danhMucLoaiHopDongService.update(danhMucLoaiHopDong));
    } else {
      this.subscribeToSaveResponse(this.danhMucLoaiHopDongService.create(danhMucLoaiHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucLoaiHopDong>>): void {
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

  protected updateForm(danhMucLoaiHopDong: IDanhMucLoaiHopDong): void {
    this.danhMucLoaiHopDong = danhMucLoaiHopDong;
    this.danhMucLoaiHopDongFormService.resetForm(this.editForm, danhMucLoaiHopDong);
  }
}
