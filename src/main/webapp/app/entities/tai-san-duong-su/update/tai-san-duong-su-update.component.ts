import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITaiSan } from 'app/entities/tai-san/tai-san.model';
import { TaiSanService } from 'app/entities/tai-san/service/tai-san.service';
import { ITaiSanDuongSu } from '../tai-san-duong-su.model';
import { TaiSanDuongSuService } from '../service/tai-san-duong-su.service';
import { TaiSanDuongSuFormService, TaiSanDuongSuFormGroup } from './tai-san-duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tai-san-duong-su-update',
  templateUrl: './tai-san-duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaiSanDuongSuUpdateComponent implements OnInit {
  isSaving = false;
  taiSanDuongSu: ITaiSanDuongSu | null = null;

  idTaiSansCollection: ITaiSan[] = [];

  protected taiSanDuongSuService = inject(TaiSanDuongSuService);
  protected taiSanDuongSuFormService = inject(TaiSanDuongSuFormService);
  protected taiSanService = inject(TaiSanService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaiSanDuongSuFormGroup = this.taiSanDuongSuFormService.createTaiSanDuongSuFormGroup();

  compareTaiSan = (o1: ITaiSan | null, o2: ITaiSan | null): boolean => this.taiSanService.compareTaiSan(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taiSanDuongSu }) => {
      this.taiSanDuongSu = taiSanDuongSu;
      if (taiSanDuongSu) {
        this.updateForm(taiSanDuongSu);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taiSanDuongSu = this.taiSanDuongSuFormService.getTaiSanDuongSu(this.editForm);
    if (taiSanDuongSu.id !== null) {
      this.subscribeToSaveResponse(this.taiSanDuongSuService.update(taiSanDuongSu));
    } else {
      this.subscribeToSaveResponse(this.taiSanDuongSuService.create(taiSanDuongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaiSanDuongSu>>): void {
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

  protected updateForm(taiSanDuongSu: ITaiSanDuongSu): void {
    this.taiSanDuongSu = taiSanDuongSu;
    this.taiSanDuongSuFormService.resetForm(this.editForm, taiSanDuongSu);

    this.idTaiSansCollection = this.taiSanService.addTaiSanToCollectionIfMissing<ITaiSan>(this.idTaiSansCollection, taiSanDuongSu.idTaiSan);
  }

  protected loadRelationshipsOptions(): void {
    this.taiSanService
      .query({ 'taiSanDuongSuId.specified': 'false' })
      .pipe(map((res: HttpResponse<ITaiSan[]>) => res.body ?? []))
      .pipe(map((taiSans: ITaiSan[]) => this.taiSanService.addTaiSanToCollectionIfMissing<ITaiSan>(taiSans, this.taiSanDuongSu?.idTaiSan)))
      .subscribe((taiSans: ITaiSan[]) => (this.idTaiSansCollection = taiSans));
  }
}
