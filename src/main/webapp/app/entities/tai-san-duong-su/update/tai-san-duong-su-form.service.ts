import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITaiSanDuongSu, NewTaiSanDuongSu } from '../tai-san-duong-su.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaiSanDuongSu for edit and NewTaiSanDuongSuFormGroupInput for create.
 */
type TaiSanDuongSuFormGroupInput = ITaiSanDuongSu | PartialWithRequiredKeyOf<NewTaiSanDuongSu>;

type TaiSanDuongSuFormDefaults = Pick<NewTaiSanDuongSu, 'id'>;

type TaiSanDuongSuFormGroupContent = {
  id: FormControl<ITaiSanDuongSu['id'] | NewTaiSanDuongSu['id']>;
  trangThai: FormControl<ITaiSanDuongSu['trangThai']>;
  idDuongSu: FormControl<ITaiSanDuongSu['idDuongSu']>;
  ngayThaoTac: FormControl<ITaiSanDuongSu['ngayThaoTac']>;
  idLoaiHopDong: FormControl<ITaiSanDuongSu['idLoaiHopDong']>;
  idChungThuc: FormControl<ITaiSanDuongSu['idChungThuc']>;
  idTaiSan: FormControl<ITaiSanDuongSu['idTaiSan']>;
};

export type TaiSanDuongSuFormGroup = FormGroup<TaiSanDuongSuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaiSanDuongSuFormService {
  createTaiSanDuongSuFormGroup(taiSanDuongSu: TaiSanDuongSuFormGroupInput = { id: null }): TaiSanDuongSuFormGroup {
    const taiSanDuongSuRawValue = {
      ...this.getFormDefaults(),
      ...taiSanDuongSu,
    };
    return new FormGroup<TaiSanDuongSuFormGroupContent>({
      id: new FormControl(
        { value: taiSanDuongSuRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      trangThai: new FormControl(taiSanDuongSuRawValue.trangThai),
      idDuongSu: new FormControl(taiSanDuongSuRawValue.idDuongSu),
      ngayThaoTac: new FormControl(taiSanDuongSuRawValue.ngayThaoTac),
      idLoaiHopDong: new FormControl(taiSanDuongSuRawValue.idLoaiHopDong),
      idChungThuc: new FormControl(taiSanDuongSuRawValue.idChungThuc),
      idTaiSan: new FormControl(taiSanDuongSuRawValue.idTaiSan),
    });
  }

  getTaiSanDuongSu(form: TaiSanDuongSuFormGroup): ITaiSanDuongSu | NewTaiSanDuongSu {
    return form.getRawValue() as ITaiSanDuongSu | NewTaiSanDuongSu;
  }

  resetForm(form: TaiSanDuongSuFormGroup, taiSanDuongSu: TaiSanDuongSuFormGroupInput): void {
    const taiSanDuongSuRawValue = { ...this.getFormDefaults(), ...taiSanDuongSu };
    form.reset(
      {
        ...taiSanDuongSuRawValue,
        id: { value: taiSanDuongSuRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaiSanDuongSuFormDefaults {
    return {
      id: null,
    };
  }
}
