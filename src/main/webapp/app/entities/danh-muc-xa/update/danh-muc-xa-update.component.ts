import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucHuyen } from 'app/entities/danh-muc-huyen/danh-muc-huyen.model';
import { DanhMucHuyenService } from 'app/entities/danh-muc-huyen/service/danh-muc-huyen.service';
import { IDanhMucXa } from '../danh-muc-xa.model';
import { DanhMucXaService } from '../service/danh-muc-xa.service';
import { DanhMucXaFormService, DanhMucXaFormGroup } from './danh-muc-xa-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-xa-update',
  templateUrl: './danh-muc-xa-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucXaUpdateComponent implements OnInit {
  isSaving = false;
  danhMucXa: IDanhMucXa | null = null;

  danhMucHuyensSharedCollection: IDanhMucHuyen[] = [];

  protected danhMucXaService = inject(DanhMucXaService);
  protected danhMucXaFormService = inject(DanhMucXaFormService);
  protected danhMucHuyenService = inject(DanhMucHuyenService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucXaFormGroup = this.danhMucXaFormService.createDanhMucXaFormGroup();

  compareDanhMucHuyen = (o1: IDanhMucHuyen | null, o2: IDanhMucHuyen | null): boolean =>
    this.danhMucHuyenService.compareDanhMucHuyen(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucXa }) => {
      this.danhMucXa = danhMucXa;
      if (danhMucXa) {
        this.updateForm(danhMucXa);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucXa = this.danhMucXaFormService.getDanhMucXa(this.editForm);
    if (danhMucXa.id !== null) {
      this.subscribeToSaveResponse(this.danhMucXaService.update(danhMucXa));
    } else {
      this.subscribeToSaveResponse(this.danhMucXaService.create(danhMucXa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucXa>>): void {
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

  protected updateForm(danhMucXa: IDanhMucXa): void {
    this.danhMucXa = danhMucXa;
    this.danhMucXaFormService.resetForm(this.editForm, danhMucXa);

    this.danhMucHuyensSharedCollection = this.danhMucHuyenService.addDanhMucHuyenToCollectionIfMissing<IDanhMucHuyen>(
      this.danhMucHuyensSharedCollection,
      danhMucXa.maHuyen,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.danhMucHuyenService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucHuyen[]>) => res.body ?? []))
      .pipe(
        map((danhMucHuyens: IDanhMucHuyen[]) =>
          this.danhMucHuyenService.addDanhMucHuyenToCollectionIfMissing<IDanhMucHuyen>(danhMucHuyens, this.danhMucXa?.maHuyen),
        ),
      )
      .subscribe((danhMucHuyens: IDanhMucHuyen[]) => (this.danhMucHuyensSharedCollection = danhMucHuyens));
  }
}
