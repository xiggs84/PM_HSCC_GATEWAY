import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IThuaTach } from '../thua-tach.model';
import { ThuaTachService } from '../service/thua-tach.service';
import { ThuaTachFormService, ThuaTachFormGroup } from './thua-tach-form.service';

@Component({
  standalone: true,
  selector: 'jhi-thua-tach-update',
  templateUrl: './thua-tach-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ThuaTachUpdateComponent implements OnInit {
  isSaving = false;
  thuaTach: IThuaTach | null = null;

  protected thuaTachService = inject(ThuaTachService);
  protected thuaTachFormService = inject(ThuaTachFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ThuaTachFormGroup = this.thuaTachFormService.createThuaTachFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thuaTach }) => {
      this.thuaTach = thuaTach;
      if (thuaTach) {
        this.updateForm(thuaTach);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const thuaTach = this.thuaTachFormService.getThuaTach(this.editForm);
    if (thuaTach.id !== null) {
      this.subscribeToSaveResponse(this.thuaTachService.update(thuaTach));
    } else {
      this.subscribeToSaveResponse(this.thuaTachService.create(thuaTach));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IThuaTach>>): void {
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

  protected updateForm(thuaTach: IThuaTach): void {
    this.thuaTach = thuaTach;
    this.thuaTachFormService.resetForm(this.editForm, thuaTach);
  }
}
