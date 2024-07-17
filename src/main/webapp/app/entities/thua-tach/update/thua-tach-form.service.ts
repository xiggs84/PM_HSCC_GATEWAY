import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IThuaTach, NewThuaTach } from '../thua-tach.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IThuaTach for edit and NewThuaTachFormGroupInput for create.
 */
type ThuaTachFormGroupInput = IThuaTach | PartialWithRequiredKeyOf<NewThuaTach>;

type ThuaTachFormDefaults = Pick<NewThuaTach, 'id'>;

type ThuaTachFormGroupContent = {
  id: FormControl<IThuaTach['id'] | NewThuaTach['id']>;
  idThuaTach: FormControl<IThuaTach['idThuaTach']>;
  idTaiSan: FormControl<IThuaTach['idTaiSan']>;
  thongTinThuaTach: FormControl<IThuaTach['thongTinThuaTach']>;
  trangThai: FormControl<IThuaTach['trangThai']>;
};

export type ThuaTachFormGroup = FormGroup<ThuaTachFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ThuaTachFormService {
  createThuaTachFormGroup(thuaTach: ThuaTachFormGroupInput = { id: null }): ThuaTachFormGroup {
    const thuaTachRawValue = {
      ...this.getFormDefaults(),
      ...thuaTach,
    };
    return new FormGroup<ThuaTachFormGroupContent>({
      id: new FormControl(
        { value: thuaTachRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idThuaTach: new FormControl(thuaTachRawValue.idThuaTach),
      idTaiSan: new FormControl(thuaTachRawValue.idTaiSan),
      thongTinThuaTach: new FormControl(thuaTachRawValue.thongTinThuaTach),
      trangThai: new FormControl(thuaTachRawValue.trangThai),
    });
  }

  getThuaTach(form: ThuaTachFormGroup): IThuaTach | NewThuaTach {
    return form.getRawValue() as IThuaTach | NewThuaTach;
  }

  resetForm(form: ThuaTachFormGroup, thuaTach: ThuaTachFormGroupInput): void {
    const thuaTachRawValue = { ...this.getFormDefaults(), ...thuaTach };
    form.reset(
      {
        ...thuaTachRawValue,
        id: { value: thuaTachRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ThuaTachFormDefaults {
    return {
      id: null,
    };
  }
}
