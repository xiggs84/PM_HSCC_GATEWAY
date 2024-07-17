import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILogDangNhap } from '../log-dang-nhap.model';
import { LogDangNhapService } from '../service/log-dang-nhap.service';
import { LogDangNhapFormService, LogDangNhapFormGroup } from './log-dang-nhap-form.service';

@Component({
  standalone: true,
  selector: 'jhi-log-dang-nhap-update',
  templateUrl: './log-dang-nhap-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LogDangNhapUpdateComponent implements OnInit {
  isSaving = false;
  logDangNhap: ILogDangNhap | null = null;

  protected logDangNhapService = inject(LogDangNhapService);
  protected logDangNhapFormService = inject(LogDangNhapFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LogDangNhapFormGroup = this.logDangNhapFormService.createLogDangNhapFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logDangNhap }) => {
      this.logDangNhap = logDangNhap;
      if (logDangNhap) {
        this.updateForm(logDangNhap);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const logDangNhap = this.logDangNhapFormService.getLogDangNhap(this.editForm);
    if (logDangNhap.id !== null) {
      this.subscribeToSaveResponse(this.logDangNhapService.update(logDangNhap));
    } else {
      this.subscribeToSaveResponse(this.logDangNhapService.create(logDangNhap));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogDangNhap>>): void {
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

  protected updateForm(logDangNhap: ILogDangNhap): void {
    this.logDangNhap = logDangNhap;
    this.logDangNhapFormService.resetForm(this.editForm, logDangNhap);
  }
}
