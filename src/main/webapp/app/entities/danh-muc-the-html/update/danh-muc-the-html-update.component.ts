import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucTheHtml } from '../danh-muc-the-html.model';
import { DanhMucTheHtmlService } from '../service/danh-muc-the-html.service';
import { DanhMucTheHtmlFormService, DanhMucTheHtmlFormGroup } from './danh-muc-the-html-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-the-html-update',
  templateUrl: './danh-muc-the-html-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucTheHtmlUpdateComponent implements OnInit {
  isSaving = false;
  danhMucTheHtml: IDanhMucTheHtml | null = null;

  protected danhMucTheHtmlService = inject(DanhMucTheHtmlService);
  protected danhMucTheHtmlFormService = inject(DanhMucTheHtmlFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucTheHtmlFormGroup = this.danhMucTheHtmlFormService.createDanhMucTheHtmlFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucTheHtml }) => {
      this.danhMucTheHtml = danhMucTheHtml;
      if (danhMucTheHtml) {
        this.updateForm(danhMucTheHtml);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucTheHtml = this.danhMucTheHtmlFormService.getDanhMucTheHtml(this.editForm);
    if (danhMucTheHtml.id !== null) {
      this.subscribeToSaveResponse(this.danhMucTheHtmlService.update(danhMucTheHtml));
    } else {
      this.subscribeToSaveResponse(this.danhMucTheHtmlService.create(danhMucTheHtml));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucTheHtml>>): void {
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

  protected updateForm(danhMucTheHtml: IDanhMucTheHtml): void {
    this.danhMucTheHtml = danhMucTheHtml;
    this.danhMucTheHtmlFormService.resetForm(this.editForm, danhMucTheHtml);
  }
}
