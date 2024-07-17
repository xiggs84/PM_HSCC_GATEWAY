import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILogLienThongMotCua } from '../log-lien-thong-mot-cua.model';
import { LogLienThongMotCuaService } from '../service/log-lien-thong-mot-cua.service';
import { LogLienThongMotCuaFormService, LogLienThongMotCuaFormGroup } from './log-lien-thong-mot-cua-form.service';

@Component({
  standalone: true,
  selector: 'jhi-log-lien-thong-mot-cua-update',
  templateUrl: './log-lien-thong-mot-cua-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LogLienThongMotCuaUpdateComponent implements OnInit {
  isSaving = false;
  logLienThongMotCua: ILogLienThongMotCua | null = null;

  protected logLienThongMotCuaService = inject(LogLienThongMotCuaService);
  protected logLienThongMotCuaFormService = inject(LogLienThongMotCuaFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LogLienThongMotCuaFormGroup = this.logLienThongMotCuaFormService.createLogLienThongMotCuaFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logLienThongMotCua }) => {
      this.logLienThongMotCua = logLienThongMotCua;
      if (logLienThongMotCua) {
        this.updateForm(logLienThongMotCua);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const logLienThongMotCua = this.logLienThongMotCuaFormService.getLogLienThongMotCua(this.editForm);
    if (logLienThongMotCua.id !== null) {
      this.subscribeToSaveResponse(this.logLienThongMotCuaService.update(logLienThongMotCua));
    } else {
      this.subscribeToSaveResponse(this.logLienThongMotCuaService.create(logLienThongMotCua));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogLienThongMotCua>>): void {
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

  protected updateForm(logLienThongMotCua: ILogLienThongMotCua): void {
    this.logLienThongMotCua = logLienThongMotCua;
    this.logLienThongMotCuaFormService.resetForm(this.editForm, logLienThongMotCua);
  }
}
