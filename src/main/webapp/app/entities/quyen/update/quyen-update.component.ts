import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IQuyen } from '../quyen.model';
import { QuyenService } from '../service/quyen.service';
import { QuyenFormService, QuyenFormGroup } from './quyen-form.service';

@Component({
  standalone: true,
  selector: 'jhi-quyen-update',
  templateUrl: './quyen-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class QuyenUpdateComponent implements OnInit {
  isSaving = false;
  quyen: IQuyen | null = null;

  protected quyenService = inject(QuyenService);
  protected quyenFormService = inject(QuyenFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: QuyenFormGroup = this.quyenFormService.createQuyenFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quyen }) => {
      this.quyen = quyen;
      if (quyen) {
        this.updateForm(quyen);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quyen = this.quyenFormService.getQuyen(this.editForm);
    if (quyen.id !== null) {
      this.subscribeToSaveResponse(this.quyenService.update(quyen));
    } else {
      this.subscribeToSaveResponse(this.quyenService.create(quyen));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuyen>>): void {
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

  protected updateForm(quyen: IQuyen): void {
    this.quyen = quyen;
    this.quyenFormService.resetForm(this.editForm, quyen);
  }
}
