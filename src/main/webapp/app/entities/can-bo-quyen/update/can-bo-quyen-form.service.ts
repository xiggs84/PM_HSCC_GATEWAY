import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICanBoQuyen, NewCanBoQuyen } from '../can-bo-quyen.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICanBoQuyen for edit and NewCanBoQuyenFormGroupInput for create.
 */
type CanBoQuyenFormGroupInput = ICanBoQuyen | PartialWithRequiredKeyOf<NewCanBoQuyen>;

type CanBoQuyenFormDefaults = Pick<NewCanBoQuyen, 'id'>;

type CanBoQuyenFormGroupContent = {
  id: FormControl<ICanBoQuyen['id'] | NewCanBoQuyen['id']>;
  idQuyen: FormControl<ICanBoQuyen['idQuyen']>;
  idDonVi: FormControl<ICanBoQuyen['idDonVi']>;
};

export type CanBoQuyenFormGroup = FormGroup<CanBoQuyenFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CanBoQuyenFormService {
  createCanBoQuyenFormGroup(canBoQuyen: CanBoQuyenFormGroupInput = { id: null }): CanBoQuyenFormGroup {
    const canBoQuyenRawValue = {
      ...this.getFormDefaults(),
      ...canBoQuyen,
    };
    return new FormGroup<CanBoQuyenFormGroupContent>({
      id: new FormControl(
        { value: canBoQuyenRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idQuyen: new FormControl(canBoQuyenRawValue.idQuyen),
      idDonVi: new FormControl(canBoQuyenRawValue.idDonVi),
    });
  }

  getCanBoQuyen(form: CanBoQuyenFormGroup): ICanBoQuyen | NewCanBoQuyen {
    return form.getRawValue() as ICanBoQuyen | NewCanBoQuyen;
  }

  resetForm(form: CanBoQuyenFormGroup, canBoQuyen: CanBoQuyenFormGroupInput): void {
    const canBoQuyenRawValue = { ...this.getFormDefaults(), ...canBoQuyen };
    form.reset(
      {
        ...canBoQuyenRawValue,
        id: { value: canBoQuyenRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CanBoQuyenFormDefaults {
    return {
      id: null,
    };
  }
}
