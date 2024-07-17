import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucKeyDanhTuFaq } from '../danh-muc-key-danh-tu-faq.model';
import { DanhMucKeyDanhTuFaqService } from '../service/danh-muc-key-danh-tu-faq.service';
import { DanhMucKeyDanhTuFaqFormService, DanhMucKeyDanhTuFaqFormGroup } from './danh-muc-key-danh-tu-faq-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-key-danh-tu-faq-update',
  templateUrl: './danh-muc-key-danh-tu-faq-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucKeyDanhTuFaqUpdateComponent implements OnInit {
  isSaving = false;
  danhMucKeyDanhTuFaq: IDanhMucKeyDanhTuFaq | null = null;

  protected danhMucKeyDanhTuFaqService = inject(DanhMucKeyDanhTuFaqService);
  protected danhMucKeyDanhTuFaqFormService = inject(DanhMucKeyDanhTuFaqFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucKeyDanhTuFaqFormGroup = this.danhMucKeyDanhTuFaqFormService.createDanhMucKeyDanhTuFaqFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucKeyDanhTuFaq }) => {
      this.danhMucKeyDanhTuFaq = danhMucKeyDanhTuFaq;
      if (danhMucKeyDanhTuFaq) {
        this.updateForm(danhMucKeyDanhTuFaq);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucKeyDanhTuFaq = this.danhMucKeyDanhTuFaqFormService.getDanhMucKeyDanhTuFaq(this.editForm);
    if (danhMucKeyDanhTuFaq.id !== null) {
      this.subscribeToSaveResponse(this.danhMucKeyDanhTuFaqService.update(danhMucKeyDanhTuFaq));
    } else {
      this.subscribeToSaveResponse(this.danhMucKeyDanhTuFaqService.create(danhMucKeyDanhTuFaq));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucKeyDanhTuFaq>>): void {
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

  protected updateForm(danhMucKeyDanhTuFaq: IDanhMucKeyDanhTuFaq): void {
    this.danhMucKeyDanhTuFaq = danhMucKeyDanhTuFaq;
    this.danhMucKeyDanhTuFaqFormService.resetForm(this.editForm, danhMucKeyDanhTuFaq);
  }
}
