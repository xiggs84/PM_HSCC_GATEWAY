import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IQuanHeNhanThan, NewQuanHeNhanThan } from '../quan-he-nhan-than.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuanHeNhanThan for edit and NewQuanHeNhanThanFormGroupInput for create.
 */
type QuanHeNhanThanFormGroupInput = IQuanHeNhanThan | PartialWithRequiredKeyOf<NewQuanHeNhanThan>;

type QuanHeNhanThanFormDefaults = Pick<NewQuanHeNhanThan, 'id'>;

type QuanHeNhanThanFormGroupContent = {
  id: FormControl<IQuanHeNhanThan['id'] | NewQuanHeNhanThan['id']>;
  idQuanHe: FormControl<IQuanHeNhanThan['idQuanHe']>;
  dienGiai: FormControl<IQuanHeNhanThan['dienGiai']>;
  idQuanHeDoiUng: FormControl<IQuanHeNhanThan['idQuanHeDoiUng']>;
  idGioiTinh: FormControl<IQuanHeNhanThan['idGioiTinh']>;
};

export type QuanHeNhanThanFormGroup = FormGroup<QuanHeNhanThanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuanHeNhanThanFormService {
  createQuanHeNhanThanFormGroup(quanHeNhanThan: QuanHeNhanThanFormGroupInput = { id: null }): QuanHeNhanThanFormGroup {
    const quanHeNhanThanRawValue = {
      ...this.getFormDefaults(),
      ...quanHeNhanThan,
    };
    return new FormGroup<QuanHeNhanThanFormGroupContent>({
      id: new FormControl(
        { value: quanHeNhanThanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idQuanHe: new FormControl(quanHeNhanThanRawValue.idQuanHe),
      dienGiai: new FormControl(quanHeNhanThanRawValue.dienGiai),
      idQuanHeDoiUng: new FormControl(quanHeNhanThanRawValue.idQuanHeDoiUng),
      idGioiTinh: new FormControl(quanHeNhanThanRawValue.idGioiTinh),
    });
  }

  getQuanHeNhanThan(form: QuanHeNhanThanFormGroup): IQuanHeNhanThan | NewQuanHeNhanThan {
    return form.getRawValue() as IQuanHeNhanThan | NewQuanHeNhanThan;
  }

  resetForm(form: QuanHeNhanThanFormGroup, quanHeNhanThan: QuanHeNhanThanFormGroupInput): void {
    const quanHeNhanThanRawValue = { ...this.getFormDefaults(), ...quanHeNhanThan };
    form.reset(
      {
        ...quanHeNhanThanRawValue,
        id: { value: quanHeNhanThanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): QuanHeNhanThanFormDefaults {
    return {
      id: null,
    };
  }
}
