import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMigrations, NewMigrations } from '../migrations.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMigrations for edit and NewMigrationsFormGroupInput for create.
 */
type MigrationsFormGroupInput = IMigrations | PartialWithRequiredKeyOf<NewMigrations>;

type MigrationsFormDefaults = Pick<NewMigrations, 'id'>;

type MigrationsFormGroupContent = {
  id: FormControl<IMigrations['id'] | NewMigrations['id']>;
  migration: FormControl<IMigrations['migration']>;
  batch: FormControl<IMigrations['batch']>;
};

export type MigrationsFormGroup = FormGroup<MigrationsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MigrationsFormService {
  createMigrationsFormGroup(migrations: MigrationsFormGroupInput = { id: null }): MigrationsFormGroup {
    const migrationsRawValue = {
      ...this.getFormDefaults(),
      ...migrations,
    };
    return new FormGroup<MigrationsFormGroupContent>({
      id: new FormControl(
        { value: migrationsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      migration: new FormControl(migrationsRawValue.migration),
      batch: new FormControl(migrationsRawValue.batch),
    });
  }

  getMigrations(form: MigrationsFormGroup): IMigrations | NewMigrations {
    return form.getRawValue() as IMigrations | NewMigrations;
  }

  resetForm(form: MigrationsFormGroup, migrations: MigrationsFormGroupInput): void {
    const migrationsRawValue = { ...this.getFormDefaults(), ...migrations };
    form.reset(
      {
        ...migrationsRawValue,
        id: { value: migrationsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): MigrationsFormDefaults {
    return {
      id: null,
    };
  }
}
