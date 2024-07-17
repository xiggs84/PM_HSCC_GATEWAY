import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { INoiCapGttt } from '../noi-cap-gttt.model';
import { NoiCapGtttService } from '../service/noi-cap-gttt.service';
import { NoiCapGtttFormService, NoiCapGtttFormGroup } from './noi-cap-gttt-form.service';

@Component({
  standalone: true,
  selector: 'jhi-noi-cap-gttt-update',
  templateUrl: './noi-cap-gttt-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class NoiCapGtttUpdateComponent implements OnInit {
  isSaving = false;
  noiCapGttt: INoiCapGttt | null = null;

  protected noiCapGtttService = inject(NoiCapGtttService);
  protected noiCapGtttFormService = inject(NoiCapGtttFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: NoiCapGtttFormGroup = this.noiCapGtttFormService.createNoiCapGtttFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ noiCapGttt }) => {
      this.noiCapGttt = noiCapGttt;
      if (noiCapGttt) {
        this.updateForm(noiCapGttt);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const noiCapGttt = this.noiCapGtttFormService.getNoiCapGttt(this.editForm);
    if (noiCapGttt.id !== null) {
      this.subscribeToSaveResponse(this.noiCapGtttService.update(noiCapGttt));
    } else {
      this.subscribeToSaveResponse(this.noiCapGtttService.create(noiCapGttt));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INoiCapGttt>>): void {
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

  protected updateForm(noiCapGttt: INoiCapGttt): void {
    this.noiCapGttt = noiCapGttt;
    this.noiCapGtttFormService.resetForm(this.editForm, noiCapGttt);
  }
}
