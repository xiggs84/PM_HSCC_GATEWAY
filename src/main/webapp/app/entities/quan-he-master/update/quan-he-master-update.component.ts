import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IQuanHeMaster } from '../quan-he-master.model';
import { QuanHeMasterService } from '../service/quan-he-master.service';
import { QuanHeMasterFormService, QuanHeMasterFormGroup } from './quan-he-master-form.service';

@Component({
  standalone: true,
  selector: 'jhi-quan-he-master-update',
  templateUrl: './quan-he-master-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class QuanHeMasterUpdateComponent implements OnInit {
  isSaving = false;
  quanHeMaster: IQuanHeMaster | null = null;

  protected quanHeMasterService = inject(QuanHeMasterService);
  protected quanHeMasterFormService = inject(QuanHeMasterFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: QuanHeMasterFormGroup = this.quanHeMasterFormService.createQuanHeMasterFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quanHeMaster }) => {
      this.quanHeMaster = quanHeMaster;
      if (quanHeMaster) {
        this.updateForm(quanHeMaster);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quanHeMaster = this.quanHeMasterFormService.getQuanHeMaster(this.editForm);
    if (quanHeMaster.id !== null) {
      this.subscribeToSaveResponse(this.quanHeMasterService.update(quanHeMaster));
    } else {
      this.subscribeToSaveResponse(this.quanHeMasterService.create(quanHeMaster));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuanHeMaster>>): void {
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

  protected updateForm(quanHeMaster: IQuanHeMaster): void {
    this.quanHeMaster = quanHeMaster;
    this.quanHeMasterFormService.resetForm(this.editForm, quanHeMaster);
  }
}
