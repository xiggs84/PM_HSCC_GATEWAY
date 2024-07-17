import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IQuanHeNhanThan } from '../quan-he-nhan-than.model';
import { QuanHeNhanThanService } from '../service/quan-he-nhan-than.service';
import { QuanHeNhanThanFormService, QuanHeNhanThanFormGroup } from './quan-he-nhan-than-form.service';

@Component({
  standalone: true,
  selector: 'jhi-quan-he-nhan-than-update',
  templateUrl: './quan-he-nhan-than-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class QuanHeNhanThanUpdateComponent implements OnInit {
  isSaving = false;
  quanHeNhanThan: IQuanHeNhanThan | null = null;

  protected quanHeNhanThanService = inject(QuanHeNhanThanService);
  protected quanHeNhanThanFormService = inject(QuanHeNhanThanFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: QuanHeNhanThanFormGroup = this.quanHeNhanThanFormService.createQuanHeNhanThanFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quanHeNhanThan }) => {
      this.quanHeNhanThan = quanHeNhanThan;
      if (quanHeNhanThan) {
        this.updateForm(quanHeNhanThan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quanHeNhanThan = this.quanHeNhanThanFormService.getQuanHeNhanThan(this.editForm);
    if (quanHeNhanThan.id !== null) {
      this.subscribeToSaveResponse(this.quanHeNhanThanService.update(quanHeNhanThan));
    } else {
      this.subscribeToSaveResponse(this.quanHeNhanThanService.create(quanHeNhanThan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuanHeNhanThan>>): void {
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

  protected updateForm(quanHeNhanThan: IQuanHeNhanThan): void {
    this.quanHeNhanThan = quanHeNhanThan;
    this.quanHeNhanThanFormService.resetForm(this.editForm, quanHeNhanThan);
  }
}
