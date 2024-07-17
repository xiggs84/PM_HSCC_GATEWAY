import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPhanLoaiHopDong } from '../phan-loai-hop-dong.model';
import { PhanLoaiHopDongService } from '../service/phan-loai-hop-dong.service';
import { PhanLoaiHopDongFormService, PhanLoaiHopDongFormGroup } from './phan-loai-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-phan-loai-hop-dong-update',
  templateUrl: './phan-loai-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PhanLoaiHopDongUpdateComponent implements OnInit {
  isSaving = false;
  phanLoaiHopDong: IPhanLoaiHopDong | null = null;

  protected phanLoaiHopDongService = inject(PhanLoaiHopDongService);
  protected phanLoaiHopDongFormService = inject(PhanLoaiHopDongFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PhanLoaiHopDongFormGroup = this.phanLoaiHopDongFormService.createPhanLoaiHopDongFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ phanLoaiHopDong }) => {
      this.phanLoaiHopDong = phanLoaiHopDong;
      if (phanLoaiHopDong) {
        this.updateForm(phanLoaiHopDong);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const phanLoaiHopDong = this.phanLoaiHopDongFormService.getPhanLoaiHopDong(this.editForm);
    if (phanLoaiHopDong.id !== null) {
      this.subscribeToSaveResponse(this.phanLoaiHopDongService.update(phanLoaiHopDong));
    } else {
      this.subscribeToSaveResponse(this.phanLoaiHopDongService.create(phanLoaiHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhanLoaiHopDong>>): void {
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

  protected updateForm(phanLoaiHopDong: IPhanLoaiHopDong): void {
    this.phanLoaiHopDong = phanLoaiHopDong;
    this.phanLoaiHopDongFormService.resetForm(this.editForm, phanLoaiHopDong);
  }
}
