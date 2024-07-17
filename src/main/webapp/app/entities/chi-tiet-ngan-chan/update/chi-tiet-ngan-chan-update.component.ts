import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IChiTietNganChan } from '../chi-tiet-ngan-chan.model';
import { ChiTietNganChanService } from '../service/chi-tiet-ngan-chan.service';
import { ChiTietNganChanFormService, ChiTietNganChanFormGroup } from './chi-tiet-ngan-chan-form.service';

@Component({
  standalone: true,
  selector: 'jhi-chi-tiet-ngan-chan-update',
  templateUrl: './chi-tiet-ngan-chan-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ChiTietNganChanUpdateComponent implements OnInit {
  isSaving = false;
  chiTietNganChan: IChiTietNganChan | null = null;

  protected chiTietNganChanService = inject(ChiTietNganChanService);
  protected chiTietNganChanFormService = inject(ChiTietNganChanFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ChiTietNganChanFormGroup = this.chiTietNganChanFormService.createChiTietNganChanFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chiTietNganChan }) => {
      this.chiTietNganChan = chiTietNganChan;
      if (chiTietNganChan) {
        this.updateForm(chiTietNganChan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chiTietNganChan = this.chiTietNganChanFormService.getChiTietNganChan(this.editForm);
    if (chiTietNganChan.id !== null) {
      this.subscribeToSaveResponse(this.chiTietNganChanService.update(chiTietNganChan));
    } else {
      this.subscribeToSaveResponse(this.chiTietNganChanService.create(chiTietNganChan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChiTietNganChan>>): void {
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

  protected updateForm(chiTietNganChan: IChiTietNganChan): void {
    this.chiTietNganChan = chiTietNganChan;
    this.chiTietNganChanFormService.resetForm(this.editForm, chiTietNganChan);
  }
}
