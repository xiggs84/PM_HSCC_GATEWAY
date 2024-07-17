import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucTinh } from 'app/entities/danh-muc-tinh/danh-muc-tinh.model';
import { DanhMucTinhService } from 'app/entities/danh-muc-tinh/service/danh-muc-tinh.service';
import { IDanhMucHuyen } from '../danh-muc-huyen.model';
import { DanhMucHuyenService } from '../service/danh-muc-huyen.service';
import { DanhMucHuyenFormService, DanhMucHuyenFormGroup } from './danh-muc-huyen-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-huyen-update',
  templateUrl: './danh-muc-huyen-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucHuyenUpdateComponent implements OnInit {
  isSaving = false;
  danhMucHuyen: IDanhMucHuyen | null = null;

  danhMucTinhsSharedCollection: IDanhMucTinh[] = [];

  protected danhMucHuyenService = inject(DanhMucHuyenService);
  protected danhMucHuyenFormService = inject(DanhMucHuyenFormService);
  protected danhMucTinhService = inject(DanhMucTinhService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucHuyenFormGroup = this.danhMucHuyenFormService.createDanhMucHuyenFormGroup();

  compareDanhMucTinh = (o1: IDanhMucTinh | null, o2: IDanhMucTinh | null): boolean => this.danhMucTinhService.compareDanhMucTinh(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucHuyen }) => {
      this.danhMucHuyen = danhMucHuyen;
      if (danhMucHuyen) {
        this.updateForm(danhMucHuyen);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucHuyen = this.danhMucHuyenFormService.getDanhMucHuyen(this.editForm);
    if (danhMucHuyen.id !== null) {
      this.subscribeToSaveResponse(this.danhMucHuyenService.update(danhMucHuyen));
    } else {
      this.subscribeToSaveResponse(this.danhMucHuyenService.create(danhMucHuyen));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucHuyen>>): void {
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

  protected updateForm(danhMucHuyen: IDanhMucHuyen): void {
    this.danhMucHuyen = danhMucHuyen;
    this.danhMucHuyenFormService.resetForm(this.editForm, danhMucHuyen);

    this.danhMucTinhsSharedCollection = this.danhMucTinhService.addDanhMucTinhToCollectionIfMissing<IDanhMucTinh>(
      this.danhMucTinhsSharedCollection,
      danhMucHuyen.maTinh,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.danhMucTinhService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucTinh[]>) => res.body ?? []))
      .pipe(
        map((danhMucTinhs: IDanhMucTinh[]) =>
          this.danhMucTinhService.addDanhMucTinhToCollectionIfMissing<IDanhMucTinh>(danhMucTinhs, this.danhMucHuyen?.maTinh),
        ),
      )
      .subscribe((danhMucTinhs: IDanhMucTinh[]) => (this.danhMucTinhsSharedCollection = danhMucTinhs));
  }
}
