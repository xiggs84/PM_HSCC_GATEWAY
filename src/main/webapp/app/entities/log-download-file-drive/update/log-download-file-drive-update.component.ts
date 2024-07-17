import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILogDownloadFileDrive } from '../log-download-file-drive.model';
import { LogDownloadFileDriveService } from '../service/log-download-file-drive.service';
import { LogDownloadFileDriveFormService, LogDownloadFileDriveFormGroup } from './log-download-file-drive-form.service';

@Component({
  standalone: true,
  selector: 'jhi-log-download-file-drive-update',
  templateUrl: './log-download-file-drive-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LogDownloadFileDriveUpdateComponent implements OnInit {
  isSaving = false;
  logDownloadFileDrive: ILogDownloadFileDrive | null = null;

  protected logDownloadFileDriveService = inject(LogDownloadFileDriveService);
  protected logDownloadFileDriveFormService = inject(LogDownloadFileDriveFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LogDownloadFileDriveFormGroup = this.logDownloadFileDriveFormService.createLogDownloadFileDriveFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logDownloadFileDrive }) => {
      this.logDownloadFileDrive = logDownloadFileDrive;
      if (logDownloadFileDrive) {
        this.updateForm(logDownloadFileDrive);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const logDownloadFileDrive = this.logDownloadFileDriveFormService.getLogDownloadFileDrive(this.editForm);
    if (logDownloadFileDrive.id !== null) {
      this.subscribeToSaveResponse(this.logDownloadFileDriveService.update(logDownloadFileDrive));
    } else {
      this.subscribeToSaveResponse(this.logDownloadFileDriveService.create(logDownloadFileDrive));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogDownloadFileDrive>>): void {
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

  protected updateForm(logDownloadFileDrive: ILogDownloadFileDrive): void {
    this.logDownloadFileDrive = logDownloadFileDrive;
    this.logDownloadFileDriveFormService.resetForm(this.editForm, logDownloadFileDrive);
  }
}
