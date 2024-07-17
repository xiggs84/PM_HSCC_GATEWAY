import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucKeyDongTuFaq } from '../danh-muc-key-dong-tu-faq.model';
import { DanhMucKeyDongTuFaqService } from '../service/danh-muc-key-dong-tu-faq.service';
import { DanhMucKeyDongTuFaqFormService, DanhMucKeyDongTuFaqFormGroup } from './danh-muc-key-dong-tu-faq-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-key-dong-tu-faq-update',
  templateUrl: './danh-muc-key-dong-tu-faq-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucKeyDongTuFaqUpdateComponent implements OnInit {
  isSaving = false;
  danhMucKeyDongTuFaq: IDanhMucKeyDongTuFaq | null = null;

  protected danhMucKeyDongTuFaqService = inject(DanhMucKeyDongTuFaqService);
  protected danhMucKeyDongTuFaqFormService = inject(DanhMucKeyDongTuFaqFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucKeyDongTuFaqFormGroup = this.danhMucKeyDongTuFaqFormService.createDanhMucKeyDongTuFaqFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucKeyDongTuFaq }) => {
      this.danhMucKeyDongTuFaq = danhMucKeyDongTuFaq;
      if (danhMucKeyDongTuFaq) {
        this.updateForm(danhMucKeyDongTuFaq);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucKeyDongTuFaq = this.danhMucKeyDongTuFaqFormService.getDanhMucKeyDongTuFaq(this.editForm);
    if (danhMucKeyDongTuFaq.id !== null) {
      this.subscribeToSaveResponse(this.danhMucKeyDongTuFaqService.update(danhMucKeyDongTuFaq));
    } else {
      this.subscribeToSaveResponse(this.danhMucKeyDongTuFaqService.create(danhMucKeyDongTuFaq));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucKeyDongTuFaq>>): void {
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

  protected updateForm(danhMucKeyDongTuFaq: IDanhMucKeyDongTuFaq): void {
    this.danhMucKeyDongTuFaq = danhMucKeyDongTuFaq;
    this.danhMucKeyDongTuFaqFormService.resetForm(this.editForm, danhMucKeyDongTuFaq);
  }
}
