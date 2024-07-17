import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IMigrations } from '../migrations.model';
import { MigrationsService } from '../service/migrations.service';
import { MigrationsFormService, MigrationsFormGroup } from './migrations-form.service';

@Component({
  standalone: true,
  selector: 'jhi-migrations-update',
  templateUrl: './migrations-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class MigrationsUpdateComponent implements OnInit {
  isSaving = false;
  migrations: IMigrations | null = null;

  protected migrationsService = inject(MigrationsService);
  protected migrationsFormService = inject(MigrationsFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: MigrationsFormGroup = this.migrationsFormService.createMigrationsFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ migrations }) => {
      this.migrations = migrations;
      if (migrations) {
        this.updateForm(migrations);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const migrations = this.migrationsFormService.getMigrations(this.editForm);
    if (migrations.id !== null) {
      this.subscribeToSaveResponse(this.migrationsService.update(migrations));
    } else {
      this.subscribeToSaveResponse(this.migrationsService.create(migrations));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMigrations>>): void {
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

  protected updateForm(migrations: IMigrations): void {
    this.migrations = migrations;
    this.migrationsFormService.resetForm(this.editForm, migrations);
  }
}
