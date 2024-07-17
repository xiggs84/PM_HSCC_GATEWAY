import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFileidDrive } from '../fileid-drive.model';
import { FileidDriveService } from '../service/fileid-drive.service';
import { FileidDriveFormService, FileidDriveFormGroup } from './fileid-drive-form.service';

@Component({
  standalone: true,
  selector: 'jhi-fileid-drive-update',
  templateUrl: './fileid-drive-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FileidDriveUpdateComponent implements OnInit {
  isSaving = false;
  fileidDrive: IFileidDrive | null = null;

  protected fileidDriveService = inject(FileidDriveService);
  protected fileidDriveFormService = inject(FileidDriveFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: FileidDriveFormGroup = this.fileidDriveFormService.createFileidDriveFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fileidDrive }) => {
      this.fileidDrive = fileidDrive;
      if (fileidDrive) {
        this.updateForm(fileidDrive);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fileidDrive = this.fileidDriveFormService.getFileidDrive(this.editForm);
    if (fileidDrive.id !== null) {
      this.subscribeToSaveResponse(this.fileidDriveService.update(fileidDrive));
    } else {
      this.subscribeToSaveResponse(this.fileidDriveService.create(fileidDrive));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFileidDrive>>): void {
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

  protected updateForm(fileidDrive: IFileidDrive): void {
    this.fileidDrive = fileidDrive;
    this.fileidDriveFormService.resetForm(this.editForm, fileidDrive);
  }
}
