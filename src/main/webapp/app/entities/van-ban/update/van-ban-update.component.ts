import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IVanBan } from '../van-ban.model';
import { VanBanService } from '../service/van-ban.service';
import { VanBanFormService, VanBanFormGroup } from './van-ban-form.service';

@Component({
  standalone: true,
  selector: 'jhi-van-ban-update',
  templateUrl: './van-ban-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class VanBanUpdateComponent implements OnInit {
  isSaving = false;
  vanBan: IVanBan | null = null;

  protected vanBanService = inject(VanBanService);
  protected vanBanFormService = inject(VanBanFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: VanBanFormGroup = this.vanBanFormService.createVanBanFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vanBan }) => {
      this.vanBan = vanBan;
      if (vanBan) {
        this.updateForm(vanBan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vanBan = this.vanBanFormService.getVanBan(this.editForm);
    if (vanBan.id !== null) {
      this.subscribeToSaveResponse(this.vanBanService.update(vanBan));
    } else {
      this.subscribeToSaveResponse(this.vanBanService.create(vanBan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVanBan>>): void {
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

  protected updateForm(vanBan: IVanBan): void {
    this.vanBan = vanBan;
    this.vanBanFormService.resetForm(this.editForm, vanBan);
  }
}
