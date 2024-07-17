import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogDownloadFileDrive, NewLogDownloadFileDrive } from '../log-download-file-drive.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILogDownloadFileDrive for edit and NewLogDownloadFileDriveFormGroupInput for create.
 */
type LogDownloadFileDriveFormGroupInput = ILogDownloadFileDrive | PartialWithRequiredKeyOf<NewLogDownloadFileDrive>;

type LogDownloadFileDriveFormDefaults = Pick<NewLogDownloadFileDrive, 'id'>;

type LogDownloadFileDriveFormGroupContent = {
  id: FormControl<ILogDownloadFileDrive['id'] | NewLogDownloadFileDrive['id']>;
  idLog: FormControl<ILogDownloadFileDrive['idLog']>;
  noiDung: FormControl<ILogDownloadFileDrive['noiDung']>;
  ngayThaoTac: FormControl<ILogDownloadFileDrive['ngayThaoTac']>;
  key: FormControl<ILogDownloadFileDrive['key']>;
};

export type LogDownloadFileDriveFormGroup = FormGroup<LogDownloadFileDriveFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LogDownloadFileDriveFormService {
  createLogDownloadFileDriveFormGroup(
    logDownloadFileDrive: LogDownloadFileDriveFormGroupInput = { id: null },
  ): LogDownloadFileDriveFormGroup {
    const logDownloadFileDriveRawValue = {
      ...this.getFormDefaults(),
      ...logDownloadFileDrive,
    };
    return new FormGroup<LogDownloadFileDriveFormGroupContent>({
      id: new FormControl(
        { value: logDownloadFileDriveRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLog: new FormControl(logDownloadFileDriveRawValue.idLog),
      noiDung: new FormControl(logDownloadFileDriveRawValue.noiDung),
      ngayThaoTac: new FormControl(logDownloadFileDriveRawValue.ngayThaoTac),
      key: new FormControl(logDownloadFileDriveRawValue.key),
    });
  }

  getLogDownloadFileDrive(form: LogDownloadFileDriveFormGroup): ILogDownloadFileDrive | NewLogDownloadFileDrive {
    return form.getRawValue() as ILogDownloadFileDrive | NewLogDownloadFileDrive;
  }

  resetForm(form: LogDownloadFileDriveFormGroup, logDownloadFileDrive: LogDownloadFileDriveFormGroupInput): void {
    const logDownloadFileDriveRawValue = { ...this.getFormDefaults(), ...logDownloadFileDrive };
    form.reset(
      {
        ...logDownloadFileDriveRawValue,
        id: { value: logDownloadFileDriveRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LogDownloadFileDriveFormDefaults {
    return {
      id: null,
    };
  }
}
