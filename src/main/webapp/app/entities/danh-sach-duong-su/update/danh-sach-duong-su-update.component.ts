import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhSachDuongSu } from '../danh-sach-duong-su.model';
import { DanhSachDuongSuService } from '../service/danh-sach-duong-su.service';
import { DanhSachDuongSuFormService, DanhSachDuongSuFormGroup } from './danh-sach-duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-duong-su-update',
  templateUrl: './danh-sach-duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhSachDuongSuUpdateComponent implements OnInit {
  isSaving = false;
  danhSachDuongSu: IDanhSachDuongSu | null = null;

  protected danhSachDuongSuService = inject(DanhSachDuongSuService);
  protected danhSachDuongSuFormService = inject(DanhSachDuongSuFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhSachDuongSuFormGroup = this.danhSachDuongSuFormService.createDanhSachDuongSuFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhSachDuongSu }) => {
      this.danhSachDuongSu = danhSachDuongSu;
      if (danhSachDuongSu) {
        this.updateForm(danhSachDuongSu);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhSachDuongSu = this.danhSachDuongSuFormService.getDanhSachDuongSu(this.editForm);
    if (danhSachDuongSu.id !== null) {
      this.subscribeToSaveResponse(this.danhSachDuongSuService.update(danhSachDuongSu));
    } else {
      this.subscribeToSaveResponse(this.danhSachDuongSuService.create(danhSachDuongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhSachDuongSu>>): void {
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

  protected updateForm(danhSachDuongSu: IDanhSachDuongSu): void {
    this.danhSachDuongSu = danhSachDuongSu;
    this.danhSachDuongSuFormService.resetForm(this.editForm, danhSachDuongSu);
  }
}
