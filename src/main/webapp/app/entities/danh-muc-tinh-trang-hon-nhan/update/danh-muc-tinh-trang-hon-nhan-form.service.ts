import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucTinhTrangHonNhan, NewDanhMucTinhTrangHonNhan } from '../danh-muc-tinh-trang-hon-nhan.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucTinhTrangHonNhan for edit and NewDanhMucTinhTrangHonNhanFormGroupInput for create.
 */
type DanhMucTinhTrangHonNhanFormGroupInput = IDanhMucTinhTrangHonNhan | PartialWithRequiredKeyOf<NewDanhMucTinhTrangHonNhan>;

type DanhMucTinhTrangHonNhanFormDefaults = Pick<NewDanhMucTinhTrangHonNhan, 'id'>;

type DanhMucTinhTrangHonNhanFormGroupContent = {
  id: FormControl<IDanhMucTinhTrangHonNhan['id'] | NewDanhMucTinhTrangHonNhan['id']>;
  idTinhTrang: FormControl<IDanhMucTinhTrangHonNhan['idTinhTrang']>;
  dienGiai: FormControl<IDanhMucTinhTrangHonNhan['dienGiai']>;
  trangThai: FormControl<IDanhMucTinhTrangHonNhan['trangThai']>;
};

export type DanhMucTinhTrangHonNhanFormGroup = FormGroup<DanhMucTinhTrangHonNhanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucTinhTrangHonNhanFormService {
  createDanhMucTinhTrangHonNhanFormGroup(
    danhMucTinhTrangHonNhan: DanhMucTinhTrangHonNhanFormGroupInput = { id: null },
  ): DanhMucTinhTrangHonNhanFormGroup {
    const danhMucTinhTrangHonNhanRawValue = {
      ...this.getFormDefaults(),
      ...danhMucTinhTrangHonNhan,
    };
    return new FormGroup<DanhMucTinhTrangHonNhanFormGroupContent>({
      id: new FormControl(
        { value: danhMucTinhTrangHonNhanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idTinhTrang: new FormControl(danhMucTinhTrangHonNhanRawValue.idTinhTrang),
      dienGiai: new FormControl(danhMucTinhTrangHonNhanRawValue.dienGiai),
      trangThai: new FormControl(danhMucTinhTrangHonNhanRawValue.trangThai),
    });
  }

  getDanhMucTinhTrangHonNhan(form: DanhMucTinhTrangHonNhanFormGroup): IDanhMucTinhTrangHonNhan | NewDanhMucTinhTrangHonNhan {
    return form.getRawValue() as IDanhMucTinhTrangHonNhan | NewDanhMucTinhTrangHonNhan;
  }

  resetForm(form: DanhMucTinhTrangHonNhanFormGroup, danhMucTinhTrangHonNhan: DanhMucTinhTrangHonNhanFormGroupInput): void {
    const danhMucTinhTrangHonNhanRawValue = { ...this.getFormDefaults(), ...danhMucTinhTrangHonNhan };
    form.reset(
      {
        ...danhMucTinhTrangHonNhanRawValue,
        id: { value: danhMucTinhTrangHonNhanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucTinhTrangHonNhanFormDefaults {
    return {
      id: null,
    };
  }
}
