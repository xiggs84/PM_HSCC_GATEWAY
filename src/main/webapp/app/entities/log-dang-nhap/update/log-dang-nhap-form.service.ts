import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogDangNhap, NewLogDangNhap } from '../log-dang-nhap.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILogDangNhap for edit and NewLogDangNhapFormGroupInput for create.
 */
type LogDangNhapFormGroupInput = ILogDangNhap | PartialWithRequiredKeyOf<NewLogDangNhap>;

type LogDangNhapFormDefaults = Pick<NewLogDangNhap, 'id'>;

type LogDangNhapFormGroupContent = {
  id: FormControl<ILogDangNhap['id'] | NewLogDangNhap['id']>;
  ngayDangNhap: FormControl<ILogDangNhap['ngayDangNhap']>;
  ipAddress: FormControl<ILogDangNhap['ipAddress']>;
  idCanBo: FormControl<ILogDangNhap['idCanBo']>;
  tenDangNhap: FormControl<ILogDangNhap['tenDangNhap']>;
};

export type LogDangNhapFormGroup = FormGroup<LogDangNhapFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LogDangNhapFormService {
  createLogDangNhapFormGroup(logDangNhap: LogDangNhapFormGroupInput = { id: null }): LogDangNhapFormGroup {
    const logDangNhapRawValue = {
      ...this.getFormDefaults(),
      ...logDangNhap,
    };
    return new FormGroup<LogDangNhapFormGroupContent>({
      id: new FormControl(
        { value: logDangNhapRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      ngayDangNhap: new FormControl(logDangNhapRawValue.ngayDangNhap),
      ipAddress: new FormControl(logDangNhapRawValue.ipAddress),
      idCanBo: new FormControl(logDangNhapRawValue.idCanBo),
      tenDangNhap: new FormControl(logDangNhapRawValue.tenDangNhap),
    });
  }

  getLogDangNhap(form: LogDangNhapFormGroup): ILogDangNhap | NewLogDangNhap {
    return form.getRawValue() as ILogDangNhap | NewLogDangNhap;
  }

  resetForm(form: LogDangNhapFormGroup, logDangNhap: LogDangNhapFormGroupInput): void {
    const logDangNhapRawValue = { ...this.getFormDefaults(), ...logDangNhap };
    form.reset(
      {
        ...logDangNhapRawValue,
        id: { value: logDangNhapRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LogDangNhapFormDefaults {
    return {
      id: null,
    };
  }
}
