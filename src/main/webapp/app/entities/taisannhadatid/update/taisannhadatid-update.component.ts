import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITaisannhadatid } from '../taisannhadatid.model';
import { TaisannhadatidService } from '../service/taisannhadatid.service';
import { TaisannhadatidFormService, TaisannhadatidFormGroup } from './taisannhadatid-form.service';

@Component({
  standalone: true,
  selector: 'jhi-taisannhadatid-update',
  templateUrl: './taisannhadatid-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaisannhadatidUpdateComponent implements OnInit {
  isSaving = false;
  taisannhadatid: ITaisannhadatid | null = null;

  protected taisannhadatidService = inject(TaisannhadatidService);
  protected taisannhadatidFormService = inject(TaisannhadatidFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaisannhadatidFormGroup = this.taisannhadatidFormService.createTaisannhadatidFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taisannhadatid }) => {
      this.taisannhadatid = taisannhadatid;
      if (taisannhadatid) {
        this.updateForm(taisannhadatid);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taisannhadatid = this.taisannhadatidFormService.getTaisannhadatid(this.editForm);
    if (taisannhadatid.id !== null) {
      this.subscribeToSaveResponse(this.taisannhadatidService.update(taisannhadatid));
    } else {
      this.subscribeToSaveResponse(this.taisannhadatidService.create(taisannhadatid));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaisannhadatid>>): void {
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

  protected updateForm(taisannhadatid: ITaisannhadatid): void {
    this.taisannhadatid = taisannhadatid;
    this.taisannhadatidFormService.resetForm(this.editForm, taisannhadatid);
  }
}
