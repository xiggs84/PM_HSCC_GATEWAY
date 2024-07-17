import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucFaq } from '../danh-muc-faq.model';
import { DanhMucFaqService } from '../service/danh-muc-faq.service';
import { DanhMucFaqFormService, DanhMucFaqFormGroup } from './danh-muc-faq-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-faq-update',
  templateUrl: './danh-muc-faq-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucFaqUpdateComponent implements OnInit {
  isSaving = false;
  danhMucFaq: IDanhMucFaq | null = null;

  protected danhMucFaqService = inject(DanhMucFaqService);
  protected danhMucFaqFormService = inject(DanhMucFaqFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucFaqFormGroup = this.danhMucFaqFormService.createDanhMucFaqFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucFaq }) => {
      this.danhMucFaq = danhMucFaq;
      if (danhMucFaq) {
        this.updateForm(danhMucFaq);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucFaq = this.danhMucFaqFormService.getDanhMucFaq(this.editForm);
    if (danhMucFaq.id !== null) {
      this.subscribeToSaveResponse(this.danhMucFaqService.update(danhMucFaq));
    } else {
      this.subscribeToSaveResponse(this.danhMucFaqService.create(danhMucFaq));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucFaq>>): void {
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

  protected updateForm(danhMucFaq: IDanhMucFaq): void {
    this.danhMucFaq = danhMucFaq;
    this.danhMucFaqFormService.resetForm(this.editForm, danhMucFaq);
  }
}
