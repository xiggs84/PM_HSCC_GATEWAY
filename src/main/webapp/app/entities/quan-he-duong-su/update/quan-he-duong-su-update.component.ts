import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IQuanHeDuongSu } from '../quan-he-duong-su.model';
import { QuanHeDuongSuService } from '../service/quan-he-duong-su.service';
import { QuanHeDuongSuFormService, QuanHeDuongSuFormGroup } from './quan-he-duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-quan-he-duong-su-update',
  templateUrl: './quan-he-duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class QuanHeDuongSuUpdateComponent implements OnInit {
  isSaving = false;
  quanHeDuongSu: IQuanHeDuongSu | null = null;

  protected quanHeDuongSuService = inject(QuanHeDuongSuService);
  protected quanHeDuongSuFormService = inject(QuanHeDuongSuFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: QuanHeDuongSuFormGroup = this.quanHeDuongSuFormService.createQuanHeDuongSuFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quanHeDuongSu }) => {
      this.quanHeDuongSu = quanHeDuongSu;
      if (quanHeDuongSu) {
        this.updateForm(quanHeDuongSu);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quanHeDuongSu = this.quanHeDuongSuFormService.getQuanHeDuongSu(this.editForm);
    if (quanHeDuongSu.id !== null) {
      this.subscribeToSaveResponse(this.quanHeDuongSuService.update(quanHeDuongSu));
    } else {
      this.subscribeToSaveResponse(this.quanHeDuongSuService.create(quanHeDuongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuanHeDuongSu>>): void {
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

  protected updateForm(quanHeDuongSu: IQuanHeDuongSu): void {
    this.quanHeDuongSu = quanHeDuongSu;
    this.quanHeDuongSuFormService.resetForm(this.editForm, quanHeDuongSu);
  }
}
