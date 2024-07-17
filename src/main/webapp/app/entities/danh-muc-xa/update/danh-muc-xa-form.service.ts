import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucXa, NewDanhMucXa } from '../danh-muc-xa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucXa for edit and NewDanhMucXaFormGroupInput for create.
 */
type DanhMucXaFormGroupInput = IDanhMucXa | PartialWithRequiredKeyOf<NewDanhMucXa>;

type DanhMucXaFormDefaults = Pick<NewDanhMucXa, 'id'>;

type DanhMucXaFormGroupContent = {
  id: FormControl<IDanhMucXa['id'] | NewDanhMucXa['id']>;
  maXa: FormControl<IDanhMucXa['maXa']>;
  tenXa: FormControl<IDanhMucXa['tenXa']>;
  trangThai: FormControl<IDanhMucXa['trangThai']>;
  maHuyen: FormControl<IDanhMucXa['maHuyen']>;
};

export type DanhMucXaFormGroup = FormGroup<DanhMucXaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucXaFormService {
  createDanhMucXaFormGroup(danhMucXa: DanhMucXaFormGroupInput = { id: null }): DanhMucXaFormGroup {
    const danhMucXaRawValue = {
      ...this.getFormDefaults(),
      ...danhMucXa,
    };
    return new FormGroup<DanhMucXaFormGroupContent>({
      id: new FormControl(
        { value: danhMucXaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      maXa: new FormControl(danhMucXaRawValue.maXa),
      tenXa: new FormControl(danhMucXaRawValue.tenXa),
      trangThai: new FormControl(danhMucXaRawValue.trangThai),
      maHuyen: new FormControl(danhMucXaRawValue.maHuyen),
    });
  }

  getDanhMucXa(form: DanhMucXaFormGroup): IDanhMucXa | NewDanhMucXa {
    return form.getRawValue() as IDanhMucXa | NewDanhMucXa;
  }

  resetForm(form: DanhMucXaFormGroup, danhMucXa: DanhMucXaFormGroupInput): void {
    const danhMucXaRawValue = { ...this.getFormDefaults(), ...danhMucXa };
    form.reset(
      {
        ...danhMucXaRawValue,
        id: { value: danhMucXaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucXaFormDefaults {
    return {
      id: null,
    };
  }
}
