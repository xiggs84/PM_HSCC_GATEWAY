import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogLienThongMotCua, NewLogLienThongMotCua } from '../log-lien-thong-mot-cua.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILogLienThongMotCua for edit and NewLogLienThongMotCuaFormGroupInput for create.
 */
type LogLienThongMotCuaFormGroupInput = ILogLienThongMotCua | PartialWithRequiredKeyOf<NewLogLienThongMotCua>;

type LogLienThongMotCuaFormDefaults = Pick<NewLogLienThongMotCua, 'id'>;

type LogLienThongMotCuaFormGroupContent = {
  id: FormControl<ILogLienThongMotCua['id'] | NewLogLienThongMotCua['id']>;
  idLog: FormControl<ILogLienThongMotCua['idLog']>;
  idChungThuc: FormControl<ILogLienThongMotCua['idChungThuc']>;
  ngayThaoTac: FormControl<ILogLienThongMotCua['ngayThaoTac']>;
  nguoiThaoTac: FormControl<ILogLienThongMotCua['nguoiThaoTac']>;
  noiDung: FormControl<ILogLienThongMotCua['noiDung']>;
};

export type LogLienThongMotCuaFormGroup = FormGroup<LogLienThongMotCuaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LogLienThongMotCuaFormService {
  createLogLienThongMotCuaFormGroup(logLienThongMotCua: LogLienThongMotCuaFormGroupInput = { id: null }): LogLienThongMotCuaFormGroup {
    const logLienThongMotCuaRawValue = {
      ...this.getFormDefaults(),
      ...logLienThongMotCua,
    };
    return new FormGroup<LogLienThongMotCuaFormGroupContent>({
      id: new FormControl(
        { value: logLienThongMotCuaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLog: new FormControl(logLienThongMotCuaRawValue.idLog),
      idChungThuc: new FormControl(logLienThongMotCuaRawValue.idChungThuc),
      ngayThaoTac: new FormControl(logLienThongMotCuaRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(logLienThongMotCuaRawValue.nguoiThaoTac),
      noiDung: new FormControl(logLienThongMotCuaRawValue.noiDung),
    });
  }

  getLogLienThongMotCua(form: LogLienThongMotCuaFormGroup): ILogLienThongMotCua | NewLogLienThongMotCua {
    return form.getRawValue() as ILogLienThongMotCua | NewLogLienThongMotCua;
  }

  resetForm(form: LogLienThongMotCuaFormGroup, logLienThongMotCua: LogLienThongMotCuaFormGroupInput): void {
    const logLienThongMotCuaRawValue = { ...this.getFormDefaults(), ...logLienThongMotCua };
    form.reset(
      {
        ...logLienThongMotCuaRawValue,
        id: { value: logLienThongMotCuaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LogLienThongMotCuaFormDefaults {
    return {
      id: null,
    };
  }
}
