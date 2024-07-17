import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogSearchDsTs, NewLogSearchDsTs } from '../log-search-ds-ts.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILogSearchDsTs for edit and NewLogSearchDsTsFormGroupInput for create.
 */
type LogSearchDsTsFormGroupInput = ILogSearchDsTs | PartialWithRequiredKeyOf<NewLogSearchDsTs>;

type LogSearchDsTsFormDefaults = Pick<NewLogSearchDsTs, 'id'>;

type LogSearchDsTsFormGroupContent = {
  id: FormControl<ILogSearchDsTs['id'] | NewLogSearchDsTs['id']>;
  idLog: FormControl<ILogSearchDsTs['idLog']>;
  nguoiThaoTac: FormControl<ILogSearchDsTs['nguoiThaoTac']>;
  ngayThaoTac: FormControl<ILogSearchDsTs['ngayThaoTac']>;
  noiDung: FormControl<ILogSearchDsTs['noiDung']>;
  slKq: FormControl<ILogSearchDsTs['slKq']>;
  kqSearch: FormControl<ILogSearchDsTs['kqSearch']>;
};

export type LogSearchDsTsFormGroup = FormGroup<LogSearchDsTsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LogSearchDsTsFormService {
  createLogSearchDsTsFormGroup(logSearchDsTs: LogSearchDsTsFormGroupInput = { id: null }): LogSearchDsTsFormGroup {
    const logSearchDsTsRawValue = {
      ...this.getFormDefaults(),
      ...logSearchDsTs,
    };
    return new FormGroup<LogSearchDsTsFormGroupContent>({
      id: new FormControl(
        { value: logSearchDsTsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLog: new FormControl(logSearchDsTsRawValue.idLog),
      nguoiThaoTac: new FormControl(logSearchDsTsRawValue.nguoiThaoTac),
      ngayThaoTac: new FormControl(logSearchDsTsRawValue.ngayThaoTac),
      noiDung: new FormControl(logSearchDsTsRawValue.noiDung),
      slKq: new FormControl(logSearchDsTsRawValue.slKq),
      kqSearch: new FormControl(logSearchDsTsRawValue.kqSearch),
    });
  }

  getLogSearchDsTs(form: LogSearchDsTsFormGroup): ILogSearchDsTs | NewLogSearchDsTs {
    return form.getRawValue() as ILogSearchDsTs | NewLogSearchDsTs;
  }

  resetForm(form: LogSearchDsTsFormGroup, logSearchDsTs: LogSearchDsTsFormGroupInput): void {
    const logSearchDsTsRawValue = { ...this.getFormDefaults(), ...logSearchDsTs };
    form.reset(
      {
        ...logSearchDsTsRawValue,
        id: { value: logSearchDsTsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LogSearchDsTsFormDefaults {
    return {
      id: null,
    };
  }
}
