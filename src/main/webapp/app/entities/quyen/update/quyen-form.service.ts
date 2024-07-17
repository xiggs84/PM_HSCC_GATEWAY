import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IQuyen, NewQuyen } from '../quyen.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuyen for edit and NewQuyenFormGroupInput for create.
 */
type QuyenFormGroupInput = IQuyen | PartialWithRequiredKeyOf<NewQuyen>;

type QuyenFormDefaults = Pick<NewQuyen, 'id'>;

type QuyenFormGroupContent = {
  id: FormControl<IQuyen['id'] | NewQuyen['id']>;
  idQuyen: FormControl<IQuyen['idQuyen']>;
  tenQuyen: FormControl<IQuyen['tenQuyen']>;
};

export type QuyenFormGroup = FormGroup<QuyenFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuyenFormService {
  createQuyenFormGroup(quyen: QuyenFormGroupInput = { id: null }): QuyenFormGroup {
    const quyenRawValue = {
      ...this.getFormDefaults(),
      ...quyen,
    };
    return new FormGroup<QuyenFormGroupContent>({
      id: new FormControl(
        { value: quyenRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idQuyen: new FormControl(quyenRawValue.idQuyen),
      tenQuyen: new FormControl(quyenRawValue.tenQuyen),
    });
  }

  getQuyen(form: QuyenFormGroup): IQuyen | NewQuyen {
    return form.getRawValue() as IQuyen | NewQuyen;
  }

  resetForm(form: QuyenFormGroup, quyen: QuyenFormGroupInput): void {
    const quyenRawValue = { ...this.getFormDefaults(), ...quyen };
    form.reset(
      {
        ...quyenRawValue,
        id: { value: quyenRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): QuyenFormDefaults {
    return {
      id: null,
    };
  }
}
