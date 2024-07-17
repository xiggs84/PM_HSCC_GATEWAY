import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILichSuGiaoDich } from '../lich-su-giao-dich.model';
import { LichSuGiaoDichService } from '../service/lich-su-giao-dich.service';
import { LichSuGiaoDichFormService, LichSuGiaoDichFormGroup } from './lich-su-giao-dich-form.service';

@Component({
  standalone: true,
  selector: 'jhi-lich-su-giao-dich-update',
  templateUrl: './lich-su-giao-dich-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LichSuGiaoDichUpdateComponent implements OnInit {
  isSaving = false;
  lichSuGiaoDich: ILichSuGiaoDich | null = null;

  protected lichSuGiaoDichService = inject(LichSuGiaoDichService);
  protected lichSuGiaoDichFormService = inject(LichSuGiaoDichFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LichSuGiaoDichFormGroup = this.lichSuGiaoDichFormService.createLichSuGiaoDichFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lichSuGiaoDich }) => {
      this.lichSuGiaoDich = lichSuGiaoDich;
      if (lichSuGiaoDich) {
        this.updateForm(lichSuGiaoDich);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lichSuGiaoDich = this.lichSuGiaoDichFormService.getLichSuGiaoDich(this.editForm);
    if (lichSuGiaoDich.id !== null) {
      this.subscribeToSaveResponse(this.lichSuGiaoDichService.update(lichSuGiaoDich));
    } else {
      this.subscribeToSaveResponse(this.lichSuGiaoDichService.create(lichSuGiaoDich));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILichSuGiaoDich>>): void {
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

  protected updateForm(lichSuGiaoDich: ILichSuGiaoDich): void {
    this.lichSuGiaoDich = lichSuGiaoDich;
    this.lichSuGiaoDichFormService.resetForm(this.editForm, lichSuGiaoDich);
  }
}
