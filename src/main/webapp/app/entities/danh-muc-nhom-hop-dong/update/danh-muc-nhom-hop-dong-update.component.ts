import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucNhomHopDong } from '../danh-muc-nhom-hop-dong.model';
import { DanhMucNhomHopDongService } from '../service/danh-muc-nhom-hop-dong.service';
import { DanhMucNhomHopDongFormService, DanhMucNhomHopDongFormGroup } from './danh-muc-nhom-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-nhom-hop-dong-update',
  templateUrl: './danh-muc-nhom-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucNhomHopDongUpdateComponent implements OnInit {
  isSaving = false;
  danhMucNhomHopDong: IDanhMucNhomHopDong | null = null;

  protected danhMucNhomHopDongService = inject(DanhMucNhomHopDongService);
  protected danhMucNhomHopDongFormService = inject(DanhMucNhomHopDongFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucNhomHopDongFormGroup = this.danhMucNhomHopDongFormService.createDanhMucNhomHopDongFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucNhomHopDong }) => {
      this.danhMucNhomHopDong = danhMucNhomHopDong;
      if (danhMucNhomHopDong) {
        this.updateForm(danhMucNhomHopDong);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucNhomHopDong = this.danhMucNhomHopDongFormService.getDanhMucNhomHopDong(this.editForm);
    if (danhMucNhomHopDong.id !== null) {
      this.subscribeToSaveResponse(this.danhMucNhomHopDongService.update(danhMucNhomHopDong));
    } else {
      this.subscribeToSaveResponse(this.danhMucNhomHopDongService.create(danhMucNhomHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucNhomHopDong>>): void {
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

  protected updateForm(danhMucNhomHopDong: IDanhMucNhomHopDong): void {
    this.danhMucNhomHopDong = danhMucNhomHopDong;
    this.danhMucNhomHopDongFormService.resetForm(this.editForm, danhMucNhomHopDong);
  }
}
