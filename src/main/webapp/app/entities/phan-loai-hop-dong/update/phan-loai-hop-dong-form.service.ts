import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPhanLoaiHopDong, NewPhanLoaiHopDong } from '../phan-loai-hop-dong.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPhanLoaiHopDong for edit and NewPhanLoaiHopDongFormGroupInput for create.
 */
type PhanLoaiHopDongFormGroupInput = IPhanLoaiHopDong | PartialWithRequiredKeyOf<NewPhanLoaiHopDong>;

type PhanLoaiHopDongFormDefaults = Pick<NewPhanLoaiHopDong, 'id'>;

type PhanLoaiHopDongFormGroupContent = {
  id: FormControl<IPhanLoaiHopDong['id'] | NewPhanLoaiHopDong['id']>;
  idPhanLoaiHopDong: FormControl<IPhanLoaiHopDong['idPhanLoaiHopDong']>;
  dienGiai: FormControl<IPhanLoaiHopDong['dienGiai']>;
};

export type PhanLoaiHopDongFormGroup = FormGroup<PhanLoaiHopDongFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PhanLoaiHopDongFormService {
  createPhanLoaiHopDongFormGroup(phanLoaiHopDong: PhanLoaiHopDongFormGroupInput = { id: null }): PhanLoaiHopDongFormGroup {
    const phanLoaiHopDongRawValue = {
      ...this.getFormDefaults(),
      ...phanLoaiHopDong,
    };
    return new FormGroup<PhanLoaiHopDongFormGroupContent>({
      id: new FormControl(
        { value: phanLoaiHopDongRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idPhanLoaiHopDong: new FormControl(phanLoaiHopDongRawValue.idPhanLoaiHopDong),
      dienGiai: new FormControl(phanLoaiHopDongRawValue.dienGiai),
    });
  }

  getPhanLoaiHopDong(form: PhanLoaiHopDongFormGroup): IPhanLoaiHopDong | NewPhanLoaiHopDong {
    return form.getRawValue() as IPhanLoaiHopDong | NewPhanLoaiHopDong;
  }

  resetForm(form: PhanLoaiHopDongFormGroup, phanLoaiHopDong: PhanLoaiHopDongFormGroupInput): void {
    const phanLoaiHopDongRawValue = { ...this.getFormDefaults(), ...phanLoaiHopDong };
    form.reset(
      {
        ...phanLoaiHopDongRawValue,
        id: { value: phanLoaiHopDongRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PhanLoaiHopDongFormDefaults {
    return {
      id: null,
    };
  }
}
