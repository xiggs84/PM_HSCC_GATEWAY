import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITinhTrangDuongSu } from '../tinh-trang-duong-su.model';
import { TinhTrangDuongSuService } from '../service/tinh-trang-duong-su.service';
import { TinhTrangDuongSuFormService, TinhTrangDuongSuFormGroup } from './tinh-trang-duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tinh-trang-duong-su-update',
  templateUrl: './tinh-trang-duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TinhTrangDuongSuUpdateComponent implements OnInit {
  isSaving = false;
  tinhTrangDuongSu: ITinhTrangDuongSu | null = null;

  protected tinhTrangDuongSuService = inject(TinhTrangDuongSuService);
  protected tinhTrangDuongSuFormService = inject(TinhTrangDuongSuFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TinhTrangDuongSuFormGroup = this.tinhTrangDuongSuFormService.createTinhTrangDuongSuFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tinhTrangDuongSu }) => {
      this.tinhTrangDuongSu = tinhTrangDuongSu;
      if (tinhTrangDuongSu) {
        this.updateForm(tinhTrangDuongSu);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tinhTrangDuongSu = this.tinhTrangDuongSuFormService.getTinhTrangDuongSu(this.editForm);
    if (tinhTrangDuongSu.id !== null) {
      this.subscribeToSaveResponse(this.tinhTrangDuongSuService.update(tinhTrangDuongSu));
    } else {
      this.subscribeToSaveResponse(this.tinhTrangDuongSuService.create(tinhTrangDuongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITinhTrangDuongSu>>): void {
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

  protected updateForm(tinhTrangDuongSu: ITinhTrangDuongSu): void {
    this.tinhTrangDuongSu = tinhTrangDuongSu;
    this.tinhTrangDuongSuFormService.resetForm(this.editForm, tinhTrangDuongSu);
  }
}
