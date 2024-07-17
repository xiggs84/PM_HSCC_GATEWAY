import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucNgoaiTe } from '../danh-muc-ngoai-te.model';
import { DanhMucNgoaiTeService } from '../service/danh-muc-ngoai-te.service';
import { DanhMucNgoaiTeFormService, DanhMucNgoaiTeFormGroup } from './danh-muc-ngoai-te-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-ngoai-te-update',
  templateUrl: './danh-muc-ngoai-te-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucNgoaiTeUpdateComponent implements OnInit {
  isSaving = false;
  danhMucNgoaiTe: IDanhMucNgoaiTe | null = null;

  protected danhMucNgoaiTeService = inject(DanhMucNgoaiTeService);
  protected danhMucNgoaiTeFormService = inject(DanhMucNgoaiTeFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucNgoaiTeFormGroup = this.danhMucNgoaiTeFormService.createDanhMucNgoaiTeFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucNgoaiTe }) => {
      this.danhMucNgoaiTe = danhMucNgoaiTe;
      if (danhMucNgoaiTe) {
        this.updateForm(danhMucNgoaiTe);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucNgoaiTe = this.danhMucNgoaiTeFormService.getDanhMucNgoaiTe(this.editForm);
    if (danhMucNgoaiTe.id !== null) {
      this.subscribeToSaveResponse(this.danhMucNgoaiTeService.update(danhMucNgoaiTe));
    } else {
      this.subscribeToSaveResponse(this.danhMucNgoaiTeService.create(danhMucNgoaiTe));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucNgoaiTe>>): void {
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

  protected updateForm(danhMucNgoaiTe: IDanhMucNgoaiTe): void {
    this.danhMucNgoaiTe = danhMucNgoaiTe;
    this.danhMucNgoaiTeFormService.resetForm(this.editForm, danhMucNgoaiTe);
  }
}
