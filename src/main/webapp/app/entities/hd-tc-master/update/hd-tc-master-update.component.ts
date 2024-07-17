import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IHdTcMaster } from '../hd-tc-master.model';
import { HdTcMasterService } from '../service/hd-tc-master.service';
import { HdTcMasterFormService, HdTcMasterFormGroup } from './hd-tc-master-form.service';

@Component({
  standalone: true,
  selector: 'jhi-hd-tc-master-update',
  templateUrl: './hd-tc-master-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class HdTcMasterUpdateComponent implements OnInit {
  isSaving = false;
  hdTcMaster: IHdTcMaster | null = null;

  protected hdTcMasterService = inject(HdTcMasterService);
  protected hdTcMasterFormService = inject(HdTcMasterFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: HdTcMasterFormGroup = this.hdTcMasterFormService.createHdTcMasterFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hdTcMaster }) => {
      this.hdTcMaster = hdTcMaster;
      if (hdTcMaster) {
        this.updateForm(hdTcMaster);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hdTcMaster = this.hdTcMasterFormService.getHdTcMaster(this.editForm);
    if (hdTcMaster.id !== null) {
      this.subscribeToSaveResponse(this.hdTcMasterService.update(hdTcMaster));
    } else {
      this.subscribeToSaveResponse(this.hdTcMasterService.create(hdTcMaster));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHdTcMaster>>): void {
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

  protected updateForm(hdTcMaster: IHdTcMaster): void {
    this.hdTcMaster = hdTcMaster;
    this.hdTcMasterFormService.resetForm(this.editForm, hdTcMaster);
  }
}
