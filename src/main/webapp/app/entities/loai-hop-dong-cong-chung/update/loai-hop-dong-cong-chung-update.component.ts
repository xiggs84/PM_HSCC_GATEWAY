import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILoaiHopDongCongChung } from '../loai-hop-dong-cong-chung.model';
import { LoaiHopDongCongChungService } from '../service/loai-hop-dong-cong-chung.service';
import { LoaiHopDongCongChungFormService, LoaiHopDongCongChungFormGroup } from './loai-hop-dong-cong-chung-form.service';

@Component({
  standalone: true,
  selector: 'jhi-loai-hop-dong-cong-chung-update',
  templateUrl: './loai-hop-dong-cong-chung-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LoaiHopDongCongChungUpdateComponent implements OnInit {
  isSaving = false;
  loaiHopDongCongChung: ILoaiHopDongCongChung | null = null;

  protected loaiHopDongCongChungService = inject(LoaiHopDongCongChungService);
  protected loaiHopDongCongChungFormService = inject(LoaiHopDongCongChungFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LoaiHopDongCongChungFormGroup = this.loaiHopDongCongChungFormService.createLoaiHopDongCongChungFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ loaiHopDongCongChung }) => {
      this.loaiHopDongCongChung = loaiHopDongCongChung;
      if (loaiHopDongCongChung) {
        this.updateForm(loaiHopDongCongChung);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const loaiHopDongCongChung = this.loaiHopDongCongChungFormService.getLoaiHopDongCongChung(this.editForm);
    if (loaiHopDongCongChung.id !== null) {
      this.subscribeToSaveResponse(this.loaiHopDongCongChungService.update(loaiHopDongCongChung));
    } else {
      this.subscribeToSaveResponse(this.loaiHopDongCongChungService.create(loaiHopDongCongChung));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoaiHopDongCongChung>>): void {
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

  protected updateForm(loaiHopDongCongChung: ILoaiHopDongCongChung): void {
    this.loaiHopDongCongChung = loaiHopDongCongChung;
    this.loaiHopDongCongChungFormService.resetForm(this.editForm, loaiHopDongCongChung);
  }
}
