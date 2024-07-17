import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITinhTrangTaiSan, NewTinhTrangTaiSan } from '../tinh-trang-tai-san.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITinhTrangTaiSan for edit and NewTinhTrangTaiSanFormGroupInput for create.
 */
type TinhTrangTaiSanFormGroupInput = ITinhTrangTaiSan | PartialWithRequiredKeyOf<NewTinhTrangTaiSan>;

type TinhTrangTaiSanFormDefaults = Pick<NewTinhTrangTaiSan, 'id'>;

type TinhTrangTaiSanFormGroupContent = {
  id: FormControl<ITinhTrangTaiSan['id'] | NewTinhTrangTaiSan['id']>;
  idTinhTrang: FormControl<ITinhTrangTaiSan['idTinhTrang']>;
  dienGiai: FormControl<ITinhTrangTaiSan['dienGiai']>;
  trangThai: FormControl<ITinhTrangTaiSan['trangThai']>;
};

export type TinhTrangTaiSanFormGroup = FormGroup<TinhTrangTaiSanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TinhTrangTaiSanFormService {
  createTinhTrangTaiSanFormGroup(tinhTrangTaiSan: TinhTrangTaiSanFormGroupInput = { id: null }): TinhTrangTaiSanFormGroup {
    const tinhTrangTaiSanRawValue = {
      ...this.getFormDefaults(),
      ...tinhTrangTaiSan,
    };
    return new FormGroup<TinhTrangTaiSanFormGroupContent>({
      id: new FormControl(
        { value: tinhTrangTaiSanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idTinhTrang: new FormControl(tinhTrangTaiSanRawValue.idTinhTrang),
      dienGiai: new FormControl(tinhTrangTaiSanRawValue.dienGiai),
      trangThai: new FormControl(tinhTrangTaiSanRawValue.trangThai),
    });
  }

  getTinhTrangTaiSan(form: TinhTrangTaiSanFormGroup): ITinhTrangTaiSan | NewTinhTrangTaiSan {
    return form.getRawValue() as ITinhTrangTaiSan | NewTinhTrangTaiSan;
  }

  resetForm(form: TinhTrangTaiSanFormGroup, tinhTrangTaiSan: TinhTrangTaiSanFormGroupInput): void {
    const tinhTrangTaiSanRawValue = { ...this.getFormDefaults(), ...tinhTrangTaiSan };
    form.reset(
      {
        ...tinhTrangTaiSanRawValue,
        id: { value: tinhTrangTaiSanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TinhTrangTaiSanFormDefaults {
    return {
      id: null,
    };
  }
}
