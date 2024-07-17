import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICauHinhHoaDonDienTu, NewCauHinhHoaDonDienTu } from '../cau-hinh-hoa-don-dien-tu.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICauHinhHoaDonDienTu for edit and NewCauHinhHoaDonDienTuFormGroupInput for create.
 */
type CauHinhHoaDonDienTuFormGroupInput = ICauHinhHoaDonDienTu | PartialWithRequiredKeyOf<NewCauHinhHoaDonDienTu>;

type CauHinhHoaDonDienTuFormDefaults = Pick<NewCauHinhHoaDonDienTu, 'id'>;

type CauHinhHoaDonDienTuFormGroupContent = {
  id: FormControl<ICauHinhHoaDonDienTu['id'] | NewCauHinhHoaDonDienTu['id']>;
  idDonVi: FormControl<ICauHinhHoaDonDienTu['idDonVi']>;
  apiUrl: FormControl<ICauHinhHoaDonDienTu['apiUrl']>;
  account: FormControl<ICauHinhHoaDonDienTu['account']>;
  accPass: FormControl<ICauHinhHoaDonDienTu['accPass']>;
  username: FormControl<ICauHinhHoaDonDienTu['username']>;
  password: FormControl<ICauHinhHoaDonDienTu['password']>;
  mauSo: FormControl<ICauHinhHoaDonDienTu['mauSo']>;
  kyHieu: FormControl<ICauHinhHoaDonDienTu['kyHieu']>;
  nguoiThaoTac: FormControl<ICauHinhHoaDonDienTu['nguoiThaoTac']>;
  ngayThaoTac: FormControl<ICauHinhHoaDonDienTu['ngayThaoTac']>;
};

export type CauHinhHoaDonDienTuFormGroup = FormGroup<CauHinhHoaDonDienTuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CauHinhHoaDonDienTuFormService {
  createCauHinhHoaDonDienTuFormGroup(cauHinhHoaDonDienTu: CauHinhHoaDonDienTuFormGroupInput = { id: null }): CauHinhHoaDonDienTuFormGroup {
    const cauHinhHoaDonDienTuRawValue = {
      ...this.getFormDefaults(),
      ...cauHinhHoaDonDienTu,
    };
    return new FormGroup<CauHinhHoaDonDienTuFormGroupContent>({
      id: new FormControl(
        { value: cauHinhHoaDonDienTuRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDonVi: new FormControl(cauHinhHoaDonDienTuRawValue.idDonVi),
      apiUrl: new FormControl(cauHinhHoaDonDienTuRawValue.apiUrl),
      account: new FormControl(cauHinhHoaDonDienTuRawValue.account),
      accPass: new FormControl(cauHinhHoaDonDienTuRawValue.accPass),
      username: new FormControl(cauHinhHoaDonDienTuRawValue.username),
      password: new FormControl(cauHinhHoaDonDienTuRawValue.password),
      mauSo: new FormControl(cauHinhHoaDonDienTuRawValue.mauSo),
      kyHieu: new FormControl(cauHinhHoaDonDienTuRawValue.kyHieu),
      nguoiThaoTac: new FormControl(cauHinhHoaDonDienTuRawValue.nguoiThaoTac),
      ngayThaoTac: new FormControl(cauHinhHoaDonDienTuRawValue.ngayThaoTac),
    });
  }

  getCauHinhHoaDonDienTu(form: CauHinhHoaDonDienTuFormGroup): ICauHinhHoaDonDienTu | NewCauHinhHoaDonDienTu {
    return form.getRawValue() as ICauHinhHoaDonDienTu | NewCauHinhHoaDonDienTu;
  }

  resetForm(form: CauHinhHoaDonDienTuFormGroup, cauHinhHoaDonDienTu: CauHinhHoaDonDienTuFormGroupInput): void {
    const cauHinhHoaDonDienTuRawValue = { ...this.getFormDefaults(), ...cauHinhHoaDonDienTu };
    form.reset(
      {
        ...cauHinhHoaDonDienTuRawValue,
        id: { value: cauHinhHoaDonDienTuRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CauHinhHoaDonDienTuFormDefaults {
    return {
      id: null,
    };
  }
}
