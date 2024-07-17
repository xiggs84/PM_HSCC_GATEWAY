import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDuongSuTrungCmnd } from '../duong-su-trung-cmnd.model';
import { DuongSuTrungCmndService } from '../service/duong-su-trung-cmnd.service';
import { DuongSuTrungCmndFormService, DuongSuTrungCmndFormGroup } from './duong-su-trung-cmnd-form.service';

@Component({
  standalone: true,
  selector: 'jhi-duong-su-trung-cmnd-update',
  templateUrl: './duong-su-trung-cmnd-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DuongSuTrungCmndUpdateComponent implements OnInit {
  isSaving = false;
  duongSuTrungCmnd: IDuongSuTrungCmnd | null = null;

  protected duongSuTrungCmndService = inject(DuongSuTrungCmndService);
  protected duongSuTrungCmndFormService = inject(DuongSuTrungCmndFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DuongSuTrungCmndFormGroup = this.duongSuTrungCmndFormService.createDuongSuTrungCmndFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ duongSuTrungCmnd }) => {
      this.duongSuTrungCmnd = duongSuTrungCmnd;
      if (duongSuTrungCmnd) {
        this.updateForm(duongSuTrungCmnd);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const duongSuTrungCmnd = this.duongSuTrungCmndFormService.getDuongSuTrungCmnd(this.editForm);
    if (duongSuTrungCmnd.id !== null) {
      this.subscribeToSaveResponse(this.duongSuTrungCmndService.update(duongSuTrungCmnd));
    } else {
      this.subscribeToSaveResponse(this.duongSuTrungCmndService.create(duongSuTrungCmnd));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDuongSuTrungCmnd>>): void {
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

  protected updateForm(duongSuTrungCmnd: IDuongSuTrungCmnd): void {
    this.duongSuTrungCmnd = duongSuTrungCmnd;
    this.duongSuTrungCmndFormService.resetForm(this.editForm, duongSuTrungCmnd);
  }
}
