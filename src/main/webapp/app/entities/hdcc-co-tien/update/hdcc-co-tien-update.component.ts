import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IHdccCoTien } from '../hdcc-co-tien.model';
import { HdccCoTienService } from '../service/hdcc-co-tien.service';
import { HdccCoTienFormService, HdccCoTienFormGroup } from './hdcc-co-tien-form.service';

@Component({
  standalone: true,
  selector: 'jhi-hdcc-co-tien-update',
  templateUrl: './hdcc-co-tien-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class HdccCoTienUpdateComponent implements OnInit {
  isSaving = false;
  hdccCoTien: IHdccCoTien | null = null;

  protected hdccCoTienService = inject(HdccCoTienService);
  protected hdccCoTienFormService = inject(HdccCoTienFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: HdccCoTienFormGroup = this.hdccCoTienFormService.createHdccCoTienFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hdccCoTien }) => {
      this.hdccCoTien = hdccCoTien;
      if (hdccCoTien) {
        this.updateForm(hdccCoTien);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hdccCoTien = this.hdccCoTienFormService.getHdccCoTien(this.editForm);
    if (hdccCoTien.id !== null) {
      this.subscribeToSaveResponse(this.hdccCoTienService.update(hdccCoTien));
    } else {
      this.subscribeToSaveResponse(this.hdccCoTienService.create(hdccCoTien));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHdccCoTien>>): void {
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

  protected updateForm(hdccCoTien: IHdccCoTien): void {
    this.hdccCoTien = hdccCoTien;
    this.hdccCoTienFormService.resetForm(this.editForm, hdccCoTien);
  }
}
