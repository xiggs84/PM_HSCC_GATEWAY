import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICauHinhHopDong } from '../cau-hinh-hop-dong.model';
import { CauHinhHopDongService } from '../service/cau-hinh-hop-dong.service';
import { CauHinhHopDongFormService, CauHinhHopDongFormGroup } from './cau-hinh-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-hop-dong-update',
  templateUrl: './cau-hinh-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CauHinhHopDongUpdateComponent implements OnInit {
  isSaving = false;
  cauHinhHopDong: ICauHinhHopDong | null = null;

  protected cauHinhHopDongService = inject(CauHinhHopDongService);
  protected cauHinhHopDongFormService = inject(CauHinhHopDongFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CauHinhHopDongFormGroup = this.cauHinhHopDongFormService.createCauHinhHopDongFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cauHinhHopDong }) => {
      this.cauHinhHopDong = cauHinhHopDong;
      if (cauHinhHopDong) {
        this.updateForm(cauHinhHopDong);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cauHinhHopDong = this.cauHinhHopDongFormService.getCauHinhHopDong(this.editForm);
    if (cauHinhHopDong.id !== null) {
      this.subscribeToSaveResponse(this.cauHinhHopDongService.update(cauHinhHopDong));
    } else {
      this.subscribeToSaveResponse(this.cauHinhHopDongService.create(cauHinhHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICauHinhHopDong>>): void {
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

  protected updateForm(cauHinhHopDong: ICauHinhHopDong): void {
    this.cauHinhHopDong = cauHinhHopDong;
    this.cauHinhHopDongFormService.resetForm(this.editForm, cauHinhHopDong);
  }
}
