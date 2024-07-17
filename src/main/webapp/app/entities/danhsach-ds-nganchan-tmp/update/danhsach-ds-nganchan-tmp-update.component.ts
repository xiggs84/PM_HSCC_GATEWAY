import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhsachDsNganchanTmp } from '../danhsach-ds-nganchan-tmp.model';
import { DanhsachDsNganchanTmpService } from '../service/danhsach-ds-nganchan-tmp.service';
import { DanhsachDsNganchanTmpFormService, DanhsachDsNganchanTmpFormGroup } from './danhsach-ds-nganchan-tmp-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danhsach-ds-nganchan-tmp-update',
  templateUrl: './danhsach-ds-nganchan-tmp-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhsachDsNganchanTmpUpdateComponent implements OnInit {
  isSaving = false;
  danhsachDsNganchanTmp: IDanhsachDsNganchanTmp | null = null;

  protected danhsachDsNganchanTmpService = inject(DanhsachDsNganchanTmpService);
  protected danhsachDsNganchanTmpFormService = inject(DanhsachDsNganchanTmpFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhsachDsNganchanTmpFormGroup = this.danhsachDsNganchanTmpFormService.createDanhsachDsNganchanTmpFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhsachDsNganchanTmp }) => {
      this.danhsachDsNganchanTmp = danhsachDsNganchanTmp;
      if (danhsachDsNganchanTmp) {
        this.updateForm(danhsachDsNganchanTmp);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhsachDsNganchanTmp = this.danhsachDsNganchanTmpFormService.getDanhsachDsNganchanTmp(this.editForm);
    if (danhsachDsNganchanTmp.id !== null) {
      this.subscribeToSaveResponse(this.danhsachDsNganchanTmpService.update(danhsachDsNganchanTmp));
    } else {
      this.subscribeToSaveResponse(this.danhsachDsNganchanTmpService.create(danhsachDsNganchanTmp));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhsachDsNganchanTmp>>): void {
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

  protected updateForm(danhsachDsNganchanTmp: IDanhsachDsNganchanTmp): void {
    this.danhsachDsNganchanTmp = danhsachDsNganchanTmp;
    this.danhsachDsNganchanTmpFormService.resetForm(this.editForm, danhsachDsNganchanTmp);
  }
}
