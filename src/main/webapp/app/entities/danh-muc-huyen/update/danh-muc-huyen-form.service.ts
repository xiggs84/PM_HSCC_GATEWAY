import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucHuyen, NewDanhMucHuyen } from '../danh-muc-huyen.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucHuyen for edit and NewDanhMucHuyenFormGroupInput for create.
 */
type DanhMucHuyenFormGroupInput = IDanhMucHuyen | PartialWithRequiredKeyOf<NewDanhMucHuyen>;

type DanhMucHuyenFormDefaults = Pick<NewDanhMucHuyen, 'id'>;

type DanhMucHuyenFormGroupContent = {
  id: FormControl<IDanhMucHuyen['id'] | NewDanhMucHuyen['id']>;
  maHuyen: FormControl<IDanhMucHuyen['maHuyen']>;
  tenHuyen: FormControl<IDanhMucHuyen['tenHuyen']>;
  trangThai: FormControl<IDanhMucHuyen['trangThai']>;
  maTinh: FormControl<IDanhMucHuyen['maTinh']>;
};

export type DanhMucHuyenFormGroup = FormGroup<DanhMucHuyenFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucHuyenFormService {
  createDanhMucHuyenFormGroup(danhMucHuyen: DanhMucHuyenFormGroupInput = { id: null }): DanhMucHuyenFormGroup {
    const danhMucHuyenRawValue = {
      ...this.getFormDefaults(),
      ...danhMucHuyen,
    };
    return new FormGroup<DanhMucHuyenFormGroupContent>({
      id: new FormControl(
        { value: danhMucHuyenRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      maHuyen: new FormControl(danhMucHuyenRawValue.maHuyen),
      tenHuyen: new FormControl(danhMucHuyenRawValue.tenHuyen),
      trangThai: new FormControl(danhMucHuyenRawValue.trangThai),
      maTinh: new FormControl(danhMucHuyenRawValue.maTinh),
    });
  }

  getDanhMucHuyen(form: DanhMucHuyenFormGroup): IDanhMucHuyen | NewDanhMucHuyen {
    return form.getRawValue() as IDanhMucHuyen | NewDanhMucHuyen;
  }

  resetForm(form: DanhMucHuyenFormGroup, danhMucHuyen: DanhMucHuyenFormGroupInput): void {
    const danhMucHuyenRawValue = { ...this.getFormDefaults(), ...danhMucHuyen };
    form.reset(
      {
        ...danhMucHuyenRawValue,
        id: { value: danhMucHuyenRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucHuyenFormDefaults {
    return {
      id: null,
    };
  }
}
