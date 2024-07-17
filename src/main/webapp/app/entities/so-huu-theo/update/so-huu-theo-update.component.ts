import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISoHuuTheo } from '../so-huu-theo.model';
import { SoHuuTheoService } from '../service/so-huu-theo.service';
import { SoHuuTheoFormService, SoHuuTheoFormGroup } from './so-huu-theo-form.service';

@Component({
  standalone: true,
  selector: 'jhi-so-huu-theo-update',
  templateUrl: './so-huu-theo-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SoHuuTheoUpdateComponent implements OnInit {
  isSaving = false;
  soHuuTheo: ISoHuuTheo | null = null;

  protected soHuuTheoService = inject(SoHuuTheoService);
  protected soHuuTheoFormService = inject(SoHuuTheoFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SoHuuTheoFormGroup = this.soHuuTheoFormService.createSoHuuTheoFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soHuuTheo }) => {
      this.soHuuTheo = soHuuTheo;
      if (soHuuTheo) {
        this.updateForm(soHuuTheo);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const soHuuTheo = this.soHuuTheoFormService.getSoHuuTheo(this.editForm);
    if (soHuuTheo.id !== null) {
      this.subscribeToSaveResponse(this.soHuuTheoService.update(soHuuTheo));
    } else {
      this.subscribeToSaveResponse(this.soHuuTheoService.create(soHuuTheo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISoHuuTheo>>): void {
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

  protected updateForm(soHuuTheo: ISoHuuTheo): void {
    this.soHuuTheo = soHuuTheo;
    this.soHuuTheoFormService.resetForm(this.editForm, soHuuTheo);
  }
}
