import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucTinh, NewDanhMucTinh } from '../danh-muc-tinh.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucTinh for edit and NewDanhMucTinhFormGroupInput for create.
 */
type DanhMucTinhFormGroupInput = IDanhMucTinh | PartialWithRequiredKeyOf<NewDanhMucTinh>;

type DanhMucTinhFormDefaults = Pick<NewDanhMucTinh, 'id'>;

type DanhMucTinhFormGroupContent = {
  id: FormControl<IDanhMucTinh['id'] | NewDanhMucTinh['id']>;
  maTinh: FormControl<IDanhMucTinh['maTinh']>;
  tenTinh: FormControl<IDanhMucTinh['tenTinh']>;
  trangThai: FormControl<IDanhMucTinh['trangThai']>;
};

export type DanhMucTinhFormGroup = FormGroup<DanhMucTinhFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucTinhFormService {
  createDanhMucTinhFormGroup(danhMucTinh: DanhMucTinhFormGroupInput = { id: null }): DanhMucTinhFormGroup {
    const danhMucTinhRawValue = {
      ...this.getFormDefaults(),
      ...danhMucTinh,
    };
    return new FormGroup<DanhMucTinhFormGroupContent>({
      id: new FormControl(
        { value: danhMucTinhRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      maTinh: new FormControl(danhMucTinhRawValue.maTinh),
      tenTinh: new FormControl(danhMucTinhRawValue.tenTinh),
      trangThai: new FormControl(danhMucTinhRawValue.trangThai),
    });
  }

  getDanhMucTinh(form: DanhMucTinhFormGroup): IDanhMucTinh | NewDanhMucTinh {
    return form.getRawValue() as IDanhMucTinh | NewDanhMucTinh;
  }

  resetForm(form: DanhMucTinhFormGroup, danhMucTinh: DanhMucTinhFormGroupInput): void {
    const danhMucTinhRawValue = { ...this.getFormDefaults(), ...danhMucTinh };
    form.reset(
      {
        ...danhMucTinhRawValue,
        id: { value: danhMucTinhRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucTinhFormDefaults {
    return {
      id: null,
    };
  }
}
