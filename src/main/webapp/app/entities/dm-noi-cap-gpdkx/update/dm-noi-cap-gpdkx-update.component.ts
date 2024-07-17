import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDmNoiCapGpdkx } from '../dm-noi-cap-gpdkx.model';
import { DmNoiCapGpdkxService } from '../service/dm-noi-cap-gpdkx.service';
import { DmNoiCapGpdkxFormService, DmNoiCapGpdkxFormGroup } from './dm-noi-cap-gpdkx-form.service';

@Component({
  standalone: true,
  selector: 'jhi-dm-noi-cap-gpdkx-update',
  templateUrl: './dm-noi-cap-gpdkx-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DmNoiCapGpdkxUpdateComponent implements OnInit {
  isSaving = false;
  dmNoiCapGpdkx: IDmNoiCapGpdkx | null = null;

  protected dmNoiCapGpdkxService = inject(DmNoiCapGpdkxService);
  protected dmNoiCapGpdkxFormService = inject(DmNoiCapGpdkxFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DmNoiCapGpdkxFormGroup = this.dmNoiCapGpdkxFormService.createDmNoiCapGpdkxFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dmNoiCapGpdkx }) => {
      this.dmNoiCapGpdkx = dmNoiCapGpdkx;
      if (dmNoiCapGpdkx) {
        this.updateForm(dmNoiCapGpdkx);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dmNoiCapGpdkx = this.dmNoiCapGpdkxFormService.getDmNoiCapGpdkx(this.editForm);
    if (dmNoiCapGpdkx.id !== null) {
      this.subscribeToSaveResponse(this.dmNoiCapGpdkxService.update(dmNoiCapGpdkx));
    } else {
      this.subscribeToSaveResponse(this.dmNoiCapGpdkxService.create(dmNoiCapGpdkx));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDmNoiCapGpdkx>>): void {
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

  protected updateForm(dmNoiCapGpdkx: IDmNoiCapGpdkx): void {
    this.dmNoiCapGpdkx = dmNoiCapGpdkx;
    this.dmNoiCapGpdkxFormService.resetForm(this.editForm, dmNoiCapGpdkx);
  }
}
