import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILogHoaDonDienTu } from '../log-hoa-don-dien-tu.model';
import { LogHoaDonDienTuService } from '../service/log-hoa-don-dien-tu.service';
import { LogHoaDonDienTuFormService, LogHoaDonDienTuFormGroup } from './log-hoa-don-dien-tu-form.service';

@Component({
  standalone: true,
  selector: 'jhi-log-hoa-don-dien-tu-update',
  templateUrl: './log-hoa-don-dien-tu-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LogHoaDonDienTuUpdateComponent implements OnInit {
  isSaving = false;
  logHoaDonDienTu: ILogHoaDonDienTu | null = null;

  protected logHoaDonDienTuService = inject(LogHoaDonDienTuService);
  protected logHoaDonDienTuFormService = inject(LogHoaDonDienTuFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LogHoaDonDienTuFormGroup = this.logHoaDonDienTuFormService.createLogHoaDonDienTuFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logHoaDonDienTu }) => {
      this.logHoaDonDienTu = logHoaDonDienTu;
      if (logHoaDonDienTu) {
        this.updateForm(logHoaDonDienTu);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const logHoaDonDienTu = this.logHoaDonDienTuFormService.getLogHoaDonDienTu(this.editForm);
    if (logHoaDonDienTu.id !== null) {
      this.subscribeToSaveResponse(this.logHoaDonDienTuService.update(logHoaDonDienTu));
    } else {
      this.subscribeToSaveResponse(this.logHoaDonDienTuService.create(logHoaDonDienTu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogHoaDonDienTu>>): void {
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

  protected updateForm(logHoaDonDienTu: ILogHoaDonDienTu): void {
    this.logHoaDonDienTu = logHoaDonDienTu;
    this.logHoaDonDienTuFormService.resetForm(this.editForm, logHoaDonDienTu);
  }
}
