import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITinhTrangDuongSu, NewTinhTrangDuongSu } from '../tinh-trang-duong-su.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITinhTrangDuongSu for edit and NewTinhTrangDuongSuFormGroupInput for create.
 */
type TinhTrangDuongSuFormGroupInput = ITinhTrangDuongSu | PartialWithRequiredKeyOf<NewTinhTrangDuongSu>;

type TinhTrangDuongSuFormDefaults = Pick<NewTinhTrangDuongSu, 'id'>;

type TinhTrangDuongSuFormGroupContent = {
  id: FormControl<ITinhTrangDuongSu['id'] | NewTinhTrangDuongSu['id']>;
  idTinhTrang: FormControl<ITinhTrangDuongSu['idTinhTrang']>;
  dienGiai: FormControl<ITinhTrangDuongSu['dienGiai']>;
  idLoaiDs: FormControl<ITinhTrangDuongSu['idLoaiDs']>;
};

export type TinhTrangDuongSuFormGroup = FormGroup<TinhTrangDuongSuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TinhTrangDuongSuFormService {
  createTinhTrangDuongSuFormGroup(tinhTrangDuongSu: TinhTrangDuongSuFormGroupInput = { id: null }): TinhTrangDuongSuFormGroup {
    const tinhTrangDuongSuRawValue = {
      ...this.getFormDefaults(),
      ...tinhTrangDuongSu,
    };
    return new FormGroup<TinhTrangDuongSuFormGroupContent>({
      id: new FormControl(
        { value: tinhTrangDuongSuRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idTinhTrang: new FormControl(tinhTrangDuongSuRawValue.idTinhTrang),
      dienGiai: new FormControl(tinhTrangDuongSuRawValue.dienGiai),
      idLoaiDs: new FormControl(tinhTrangDuongSuRawValue.idLoaiDs),
    });
  }

  getTinhTrangDuongSu(form: TinhTrangDuongSuFormGroup): ITinhTrangDuongSu | NewTinhTrangDuongSu {
    return form.getRawValue() as ITinhTrangDuongSu | NewTinhTrangDuongSu;
  }

  resetForm(form: TinhTrangDuongSuFormGroup, tinhTrangDuongSu: TinhTrangDuongSuFormGroupInput): void {
    const tinhTrangDuongSuRawValue = { ...this.getFormDefaults(), ...tinhTrangDuongSu };
    form.reset(
      {
        ...tinhTrangDuongSuRawValue,
        id: { value: tinhTrangDuongSuRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TinhTrangDuongSuFormDefaults {
    return {
      id: null,
    };
  }
}
