import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILogThaoTac } from '../log-thao-tac.model';
import { LogThaoTacService } from '../service/log-thao-tac.service';
import { LogThaoTacFormService, LogThaoTacFormGroup } from './log-thao-tac-form.service';

@Component({
  standalone: true,
  selector: 'jhi-log-thao-tac-update',
  templateUrl: './log-thao-tac-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LogThaoTacUpdateComponent implements OnInit {
  isSaving = false;
  logThaoTac: ILogThaoTac | null = null;

  protected logThaoTacService = inject(LogThaoTacService);
  protected logThaoTacFormService = inject(LogThaoTacFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LogThaoTacFormGroup = this.logThaoTacFormService.createLogThaoTacFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logThaoTac }) => {
      this.logThaoTac = logThaoTac;
      if (logThaoTac) {
        this.updateForm(logThaoTac);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const logThaoTac = this.logThaoTacFormService.getLogThaoTac(this.editForm);
    if (logThaoTac.id !== null) {
      this.subscribeToSaveResponse(this.logThaoTacService.update(logThaoTac));
    } else {
      this.subscribeToSaveResponse(this.logThaoTacService.create(logThaoTac));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogThaoTac>>): void {
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

  protected updateForm(logThaoTac: ILogThaoTac): void {
    this.logThaoTac = logThaoTac;
    this.logThaoTacFormService.resetForm(this.editForm, logThaoTac);
  }
}
