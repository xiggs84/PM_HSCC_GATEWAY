import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILogSearchDsTs } from '../log-search-ds-ts.model';
import { LogSearchDsTsService } from '../service/log-search-ds-ts.service';
import { LogSearchDsTsFormService, LogSearchDsTsFormGroup } from './log-search-ds-ts-form.service';

@Component({
  standalone: true,
  selector: 'jhi-log-search-ds-ts-update',
  templateUrl: './log-search-ds-ts-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LogSearchDsTsUpdateComponent implements OnInit {
  isSaving = false;
  logSearchDsTs: ILogSearchDsTs | null = null;

  protected logSearchDsTsService = inject(LogSearchDsTsService);
  protected logSearchDsTsFormService = inject(LogSearchDsTsFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LogSearchDsTsFormGroup = this.logSearchDsTsFormService.createLogSearchDsTsFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logSearchDsTs }) => {
      this.logSearchDsTs = logSearchDsTs;
      if (logSearchDsTs) {
        this.updateForm(logSearchDsTs);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const logSearchDsTs = this.logSearchDsTsFormService.getLogSearchDsTs(this.editForm);
    if (logSearchDsTs.id !== null) {
      this.subscribeToSaveResponse(this.logSearchDsTsService.update(logSearchDsTs));
    } else {
      this.subscribeToSaveResponse(this.logSearchDsTsService.create(logSearchDsTs));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogSearchDsTs>>): void {
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

  protected updateForm(logSearchDsTs: ILogSearchDsTs): void {
    this.logSearchDsTs = logSearchDsTs;
    this.logSearchDsTsFormService.resetForm(this.editForm, logSearchDsTs);
  }
}
