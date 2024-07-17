import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IHdMasterCoCcv } from '../hd-master-co-ccv.model';
import { HdMasterCoCcvService } from '../service/hd-master-co-ccv.service';
import { HdMasterCoCcvFormService, HdMasterCoCcvFormGroup } from './hd-master-co-ccv-form.service';

@Component({
  standalone: true,
  selector: 'jhi-hd-master-co-ccv-update',
  templateUrl: './hd-master-co-ccv-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class HdMasterCoCcvUpdateComponent implements OnInit {
  isSaving = false;
  hdMasterCoCcv: IHdMasterCoCcv | null = null;

  protected hdMasterCoCcvService = inject(HdMasterCoCcvService);
  protected hdMasterCoCcvFormService = inject(HdMasterCoCcvFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: HdMasterCoCcvFormGroup = this.hdMasterCoCcvFormService.createHdMasterCoCcvFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hdMasterCoCcv }) => {
      this.hdMasterCoCcv = hdMasterCoCcv;
      if (hdMasterCoCcv) {
        this.updateForm(hdMasterCoCcv);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hdMasterCoCcv = this.hdMasterCoCcvFormService.getHdMasterCoCcv(this.editForm);
    if (hdMasterCoCcv.id !== null) {
      this.subscribeToSaveResponse(this.hdMasterCoCcvService.update(hdMasterCoCcv));
    } else {
      this.subscribeToSaveResponse(this.hdMasterCoCcvService.create(hdMasterCoCcv));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHdMasterCoCcv>>): void {
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

  protected updateForm(hdMasterCoCcv: IHdMasterCoCcv): void {
    this.hdMasterCoCcv = hdMasterCoCcv;
    this.hdMasterCoCcvFormService.resetForm(this.editForm, hdMasterCoCcv);
  }
}
