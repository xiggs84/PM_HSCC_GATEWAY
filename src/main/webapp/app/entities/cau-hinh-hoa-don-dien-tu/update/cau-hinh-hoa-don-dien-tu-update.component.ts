import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICauHinhHoaDonDienTu } from '../cau-hinh-hoa-don-dien-tu.model';
import { CauHinhHoaDonDienTuService } from '../service/cau-hinh-hoa-don-dien-tu.service';
import { CauHinhHoaDonDienTuFormService, CauHinhHoaDonDienTuFormGroup } from './cau-hinh-hoa-don-dien-tu-form.service';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-hoa-don-dien-tu-update',
  templateUrl: './cau-hinh-hoa-don-dien-tu-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CauHinhHoaDonDienTuUpdateComponent implements OnInit {
  isSaving = false;
  cauHinhHoaDonDienTu: ICauHinhHoaDonDienTu | null = null;

  protected cauHinhHoaDonDienTuService = inject(CauHinhHoaDonDienTuService);
  protected cauHinhHoaDonDienTuFormService = inject(CauHinhHoaDonDienTuFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CauHinhHoaDonDienTuFormGroup = this.cauHinhHoaDonDienTuFormService.createCauHinhHoaDonDienTuFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cauHinhHoaDonDienTu }) => {
      this.cauHinhHoaDonDienTu = cauHinhHoaDonDienTu;
      if (cauHinhHoaDonDienTu) {
        this.updateForm(cauHinhHoaDonDienTu);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cauHinhHoaDonDienTu = this.cauHinhHoaDonDienTuFormService.getCauHinhHoaDonDienTu(this.editForm);
    if (cauHinhHoaDonDienTu.id !== null) {
      this.subscribeToSaveResponse(this.cauHinhHoaDonDienTuService.update(cauHinhHoaDonDienTu));
    } else {
      this.subscribeToSaveResponse(this.cauHinhHoaDonDienTuService.create(cauHinhHoaDonDienTu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICauHinhHoaDonDienTu>>): void {
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

  protected updateForm(cauHinhHoaDonDienTu: ICauHinhHoaDonDienTu): void {
    this.cauHinhHoaDonDienTu = cauHinhHoaDonDienTu;
    this.cauHinhHoaDonDienTuFormService.resetForm(this.editForm, cauHinhHoaDonDienTu);
  }
}
