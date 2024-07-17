import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IHdMasterTcCoCcv } from '../hd-master-tc-co-ccv.model';
import { HdMasterTcCoCcvService } from '../service/hd-master-tc-co-ccv.service';
import { HdMasterTcCoCcvFormService, HdMasterTcCoCcvFormGroup } from './hd-master-tc-co-ccv-form.service';

@Component({
  standalone: true,
  selector: 'jhi-hd-master-tc-co-ccv-update',
  templateUrl: './hd-master-tc-co-ccv-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class HdMasterTcCoCcvUpdateComponent implements OnInit {
  isSaving = false;
  hdMasterTcCoCcv: IHdMasterTcCoCcv | null = null;

  protected hdMasterTcCoCcvService = inject(HdMasterTcCoCcvService);
  protected hdMasterTcCoCcvFormService = inject(HdMasterTcCoCcvFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: HdMasterTcCoCcvFormGroup = this.hdMasterTcCoCcvFormService.createHdMasterTcCoCcvFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hdMasterTcCoCcv }) => {
      this.hdMasterTcCoCcv = hdMasterTcCoCcv;
      if (hdMasterTcCoCcv) {
        this.updateForm(hdMasterTcCoCcv);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hdMasterTcCoCcv = this.hdMasterTcCoCcvFormService.getHdMasterTcCoCcv(this.editForm);
    if (hdMasterTcCoCcv.id !== null) {
      this.subscribeToSaveResponse(this.hdMasterTcCoCcvService.update(hdMasterTcCoCcv));
    } else {
      this.subscribeToSaveResponse(this.hdMasterTcCoCcvService.create(hdMasterTcCoCcv));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHdMasterTcCoCcv>>): void {
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

  protected updateForm(hdMasterTcCoCcv: IHdMasterTcCoCcv): void {
    this.hdMasterTcCoCcv = hdMasterTcCoCcv;
    this.hdMasterTcCoCcvFormService.resetForm(this.editForm, hdMasterTcCoCcv);
  }
}
