import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucNgonNgu } from '../danh-muc-ngon-ngu.model';
import { DanhMucNgonNguService } from '../service/danh-muc-ngon-ngu.service';
import { DanhMucNgonNguFormService, DanhMucNgonNguFormGroup } from './danh-muc-ngon-ngu-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-ngon-ngu-update',
  templateUrl: './danh-muc-ngon-ngu-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucNgonNguUpdateComponent implements OnInit {
  isSaving = false;
  danhMucNgonNgu: IDanhMucNgonNgu | null = null;

  protected danhMucNgonNguService = inject(DanhMucNgonNguService);
  protected danhMucNgonNguFormService = inject(DanhMucNgonNguFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucNgonNguFormGroup = this.danhMucNgonNguFormService.createDanhMucNgonNguFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucNgonNgu }) => {
      this.danhMucNgonNgu = danhMucNgonNgu;
      if (danhMucNgonNgu) {
        this.updateForm(danhMucNgonNgu);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucNgonNgu = this.danhMucNgonNguFormService.getDanhMucNgonNgu(this.editForm);
    if (danhMucNgonNgu.id !== null) {
      this.subscribeToSaveResponse(this.danhMucNgonNguService.update(danhMucNgonNgu));
    } else {
      this.subscribeToSaveResponse(this.danhMucNgonNguService.create(danhMucNgonNgu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucNgonNgu>>): void {
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

  protected updateForm(danhMucNgonNgu: IDanhMucNgonNgu): void {
    this.danhMucNgonNgu = danhMucNgonNgu;
    this.danhMucNgonNguFormService.resetForm(this.editForm, danhMucNgonNgu);
  }
}
