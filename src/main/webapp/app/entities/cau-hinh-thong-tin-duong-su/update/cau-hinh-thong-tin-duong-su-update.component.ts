import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICauHinhThongTinDuongSu } from '../cau-hinh-thong-tin-duong-su.model';
import { CauHinhThongTinDuongSuService } from '../service/cau-hinh-thong-tin-duong-su.service';
import { CauHinhThongTinDuongSuFormService, CauHinhThongTinDuongSuFormGroup } from './cau-hinh-thong-tin-duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-thong-tin-duong-su-update',
  templateUrl: './cau-hinh-thong-tin-duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CauHinhThongTinDuongSuUpdateComponent implements OnInit {
  isSaving = false;
  cauHinhThongTinDuongSu: ICauHinhThongTinDuongSu | null = null;

  protected cauHinhThongTinDuongSuService = inject(CauHinhThongTinDuongSuService);
  protected cauHinhThongTinDuongSuFormService = inject(CauHinhThongTinDuongSuFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CauHinhThongTinDuongSuFormGroup = this.cauHinhThongTinDuongSuFormService.createCauHinhThongTinDuongSuFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cauHinhThongTinDuongSu }) => {
      this.cauHinhThongTinDuongSu = cauHinhThongTinDuongSu;
      if (cauHinhThongTinDuongSu) {
        this.updateForm(cauHinhThongTinDuongSu);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cauHinhThongTinDuongSu = this.cauHinhThongTinDuongSuFormService.getCauHinhThongTinDuongSu(this.editForm);
    if (cauHinhThongTinDuongSu.id !== null) {
      this.subscribeToSaveResponse(this.cauHinhThongTinDuongSuService.update(cauHinhThongTinDuongSu));
    } else {
      this.subscribeToSaveResponse(this.cauHinhThongTinDuongSuService.create(cauHinhThongTinDuongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICauHinhThongTinDuongSu>>): void {
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

  protected updateForm(cauHinhThongTinDuongSu: ICauHinhThongTinDuongSu): void {
    this.cauHinhThongTinDuongSu = cauHinhThongTinDuongSu;
    this.cauHinhThongTinDuongSuFormService.resetForm(this.editForm, cauHinhThongTinDuongSu);
  }
}
