import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IMenuQuyen } from '../menu-quyen.model';
import { MenuQuyenService } from '../service/menu-quyen.service';
import { MenuQuyenFormService, MenuQuyenFormGroup } from './menu-quyen-form.service';

@Component({
  standalone: true,
  selector: 'jhi-menu-quyen-update',
  templateUrl: './menu-quyen-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class MenuQuyenUpdateComponent implements OnInit {
  isSaving = false;
  menuQuyen: IMenuQuyen | null = null;

  protected menuQuyenService = inject(MenuQuyenService);
  protected menuQuyenFormService = inject(MenuQuyenFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: MenuQuyenFormGroup = this.menuQuyenFormService.createMenuQuyenFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menuQuyen }) => {
      this.menuQuyen = menuQuyen;
      if (menuQuyen) {
        this.updateForm(menuQuyen);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const menuQuyen = this.menuQuyenFormService.getMenuQuyen(this.editForm);
    if (menuQuyen.id !== null) {
      this.subscribeToSaveResponse(this.menuQuyenService.update(menuQuyen));
    } else {
      this.subscribeToSaveResponse(this.menuQuyenService.create(menuQuyen));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenuQuyen>>): void {
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

  protected updateForm(menuQuyen: IMenuQuyen): void {
    this.menuQuyen = menuQuyen;
    this.menuQuyenFormService.resetForm(this.editForm, menuQuyen);
  }
}
