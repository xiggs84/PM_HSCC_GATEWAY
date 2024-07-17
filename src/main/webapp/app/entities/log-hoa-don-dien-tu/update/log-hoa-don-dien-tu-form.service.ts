import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogHoaDonDienTu, NewLogHoaDonDienTu } from '../log-hoa-don-dien-tu.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILogHoaDonDienTu for edit and NewLogHoaDonDienTuFormGroupInput for create.
 */
type LogHoaDonDienTuFormGroupInput = ILogHoaDonDienTu | PartialWithRequiredKeyOf<NewLogHoaDonDienTu>;

type LogHoaDonDienTuFormDefaults = Pick<NewLogHoaDonDienTu, 'id'>;

type LogHoaDonDienTuFormGroupContent = {
  id: FormControl<ILogHoaDonDienTu['id'] | NewLogHoaDonDienTu['id']>;
  idDonVi: FormControl<ILogHoaDonDienTu['idDonVi']>;
  idHopDong: FormControl<ILogHoaDonDienTu['idHopDong']>;
  fKey: FormControl<ILogHoaDonDienTu['fKey']>;
  ketQua: FormControl<ILogHoaDonDienTu['ketQua']>;
  trangThai: FormControl<ILogHoaDonDienTu['trangThai']>;
  ngayPhatHanh: FormControl<ILogHoaDonDienTu['ngayPhatHanh']>;
};

export type LogHoaDonDienTuFormGroup = FormGroup<LogHoaDonDienTuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LogHoaDonDienTuFormService {
  createLogHoaDonDienTuFormGroup(logHoaDonDienTu: LogHoaDonDienTuFormGroupInput = { id: null }): LogHoaDonDienTuFormGroup {
    const logHoaDonDienTuRawValue = {
      ...this.getFormDefaults(),
      ...logHoaDonDienTu,
    };
    return new FormGroup<LogHoaDonDienTuFormGroupContent>({
      id: new FormControl(
        { value: logHoaDonDienTuRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDonVi: new FormControl(logHoaDonDienTuRawValue.idDonVi),
      idHopDong: new FormControl(logHoaDonDienTuRawValue.idHopDong),
      fKey: new FormControl(logHoaDonDienTuRawValue.fKey),
      ketQua: new FormControl(logHoaDonDienTuRawValue.ketQua),
      trangThai: new FormControl(logHoaDonDienTuRawValue.trangThai),
      ngayPhatHanh: new FormControl(logHoaDonDienTuRawValue.ngayPhatHanh),
    });
  }

  getLogHoaDonDienTu(form: LogHoaDonDienTuFormGroup): ILogHoaDonDienTu | NewLogHoaDonDienTu {
    return form.getRawValue() as ILogHoaDonDienTu | NewLogHoaDonDienTu;
  }

  resetForm(form: LogHoaDonDienTuFormGroup, logHoaDonDienTu: LogHoaDonDienTuFormGroupInput): void {
    const logHoaDonDienTuRawValue = { ...this.getFormDefaults(), ...logHoaDonDienTu };
    form.reset(
      {
        ...logHoaDonDienTuRawValue,
        id: { value: logHoaDonDienTuRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LogHoaDonDienTuFormDefaults {
    return {
      id: null,
    };
  }
}
