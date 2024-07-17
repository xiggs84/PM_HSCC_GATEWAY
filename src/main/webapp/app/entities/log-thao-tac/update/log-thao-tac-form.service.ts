import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogThaoTac, NewLogThaoTac } from '../log-thao-tac.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILogThaoTac for edit and NewLogThaoTacFormGroupInput for create.
 */
type LogThaoTacFormGroupInput = ILogThaoTac | PartialWithRequiredKeyOf<NewLogThaoTac>;

type LogThaoTacFormDefaults = Pick<NewLogThaoTac, 'id'>;

type LogThaoTacFormGroupContent = {
  id: FormControl<ILogThaoTac['id'] | NewLogThaoTac['id']>;
  idLog: FormControl<ILogThaoTac['idLog']>;
  dienGiai: FormControl<ILogThaoTac['dienGiai']>;
  tenBang: FormControl<ILogThaoTac['tenBang']>;
  idKhoa: FormControl<ILogThaoTac['idKhoa']>;
  ngayThaoTac: FormControl<ILogThaoTac['ngayThaoTac']>;
  nguoiThaoTac: FormControl<ILogThaoTac['nguoiThaoTac']>;
};

export type LogThaoTacFormGroup = FormGroup<LogThaoTacFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LogThaoTacFormService {
  createLogThaoTacFormGroup(logThaoTac: LogThaoTacFormGroupInput = { id: null }): LogThaoTacFormGroup {
    const logThaoTacRawValue = {
      ...this.getFormDefaults(),
      ...logThaoTac,
    };
    return new FormGroup<LogThaoTacFormGroupContent>({
      id: new FormControl(
        { value: logThaoTacRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLog: new FormControl(logThaoTacRawValue.idLog),
      dienGiai: new FormControl(logThaoTacRawValue.dienGiai),
      tenBang: new FormControl(logThaoTacRawValue.tenBang),
      idKhoa: new FormControl(logThaoTacRawValue.idKhoa),
      ngayThaoTac: new FormControl(logThaoTacRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(logThaoTacRawValue.nguoiThaoTac),
    });
  }

  getLogThaoTac(form: LogThaoTacFormGroup): ILogThaoTac | NewLogThaoTac {
    return form.getRawValue() as ILogThaoTac | NewLogThaoTac;
  }

  resetForm(form: LogThaoTacFormGroup, logThaoTac: LogThaoTacFormGroupInput): void {
    const logThaoTacRawValue = { ...this.getFormDefaults(), ...logThaoTac };
    form.reset(
      {
        ...logThaoTacRawValue,
        id: { value: logThaoTacRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LogThaoTacFormDefaults {
    return {
      id: null,
    };
  }
}
