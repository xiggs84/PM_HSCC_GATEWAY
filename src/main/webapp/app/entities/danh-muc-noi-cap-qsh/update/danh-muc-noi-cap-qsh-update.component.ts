import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucNoiCapQsh } from '../danh-muc-noi-cap-qsh.model';
import { DanhMucNoiCapQshService } from '../service/danh-muc-noi-cap-qsh.service';
import { DanhMucNoiCapQshFormService, DanhMucNoiCapQshFormGroup } from './danh-muc-noi-cap-qsh-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-noi-cap-qsh-update',
  templateUrl: './danh-muc-noi-cap-qsh-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucNoiCapQshUpdateComponent implements OnInit {
  isSaving = false;
  danhMucNoiCapQsh: IDanhMucNoiCapQsh | null = null;

  protected danhMucNoiCapQshService = inject(DanhMucNoiCapQshService);
  protected danhMucNoiCapQshFormService = inject(DanhMucNoiCapQshFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucNoiCapQshFormGroup = this.danhMucNoiCapQshFormService.createDanhMucNoiCapQshFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucNoiCapQsh }) => {
      this.danhMucNoiCapQsh = danhMucNoiCapQsh;
      if (danhMucNoiCapQsh) {
        this.updateForm(danhMucNoiCapQsh);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucNoiCapQsh = this.danhMucNoiCapQshFormService.getDanhMucNoiCapQsh(this.editForm);
    if (danhMucNoiCapQsh.id !== null) {
      this.subscribeToSaveResponse(this.danhMucNoiCapQshService.update(danhMucNoiCapQsh));
    } else {
      this.subscribeToSaveResponse(this.danhMucNoiCapQshService.create(danhMucNoiCapQsh));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucNoiCapQsh>>): void {
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

  protected updateForm(danhMucNoiCapQsh: IDanhMucNoiCapQsh): void {
    this.danhMucNoiCapQsh = danhMucNoiCapQsh;
    this.danhMucNoiCapQshFormService.resetForm(this.editForm, danhMucNoiCapQsh);
  }
}
