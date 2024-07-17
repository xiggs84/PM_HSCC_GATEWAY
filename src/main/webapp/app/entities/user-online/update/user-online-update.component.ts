import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUserOnline } from '../user-online.model';
import { UserOnlineService } from '../service/user-online.service';
import { UserOnlineFormService, UserOnlineFormGroup } from './user-online-form.service';

@Component({
  standalone: true,
  selector: 'jhi-user-online-update',
  templateUrl: './user-online-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class UserOnlineUpdateComponent implements OnInit {
  isSaving = false;
  userOnline: IUserOnline | null = null;

  protected userOnlineService = inject(UserOnlineService);
  protected userOnlineFormService = inject(UserOnlineFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: UserOnlineFormGroup = this.userOnlineFormService.createUserOnlineFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userOnline }) => {
      this.userOnline = userOnline;
      if (userOnline) {
        this.updateForm(userOnline);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userOnline = this.userOnlineFormService.getUserOnline(this.editForm);
    if (userOnline.id !== null) {
      this.subscribeToSaveResponse(this.userOnlineService.update(userOnline));
    } else {
      this.subscribeToSaveResponse(this.userOnlineService.create(userOnline));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserOnline>>): void {
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

  protected updateForm(userOnline: IUserOnline): void {
    this.userOnline = userOnline;
    this.userOnlineFormService.resetForm(this.editForm, userOnline);
  }
}
