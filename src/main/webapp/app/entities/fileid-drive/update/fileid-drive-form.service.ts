import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFileidDrive, NewFileidDrive } from '../fileid-drive.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFileidDrive for edit and NewFileidDriveFormGroupInput for create.
 */
type FileidDriveFormGroupInput = IFileidDrive | PartialWithRequiredKeyOf<NewFileidDrive>;

type FileidDriveFormDefaults = Pick<NewFileidDrive, 'id'>;

type FileidDriveFormGroupContent = {
  id: FormControl<IFileidDrive['id'] | NewFileidDrive['id']>;
  fileId: FormControl<IFileidDrive['fileId']>;
  trangThai: FormControl<IFileidDrive['trangThai']>;
  idHopDong: FormControl<IFileidDrive['idHopDong']>;
};

export type FileidDriveFormGroup = FormGroup<FileidDriveFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FileidDriveFormService {
  createFileidDriveFormGroup(fileidDrive: FileidDriveFormGroupInput = { id: null }): FileidDriveFormGroup {
    const fileidDriveRawValue = {
      ...this.getFormDefaults(),
      ...fileidDrive,
    };
    return new FormGroup<FileidDriveFormGroupContent>({
      id: new FormControl(
        { value: fileidDriveRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      fileId: new FormControl(fileidDriveRawValue.fileId),
      trangThai: new FormControl(fileidDriveRawValue.trangThai),
      idHopDong: new FormControl(fileidDriveRawValue.idHopDong),
    });
  }

  getFileidDrive(form: FileidDriveFormGroup): IFileidDrive | NewFileidDrive {
    return form.getRawValue() as IFileidDrive | NewFileidDrive;
  }

  resetForm(form: FileidDriveFormGroup, fileidDrive: FileidDriveFormGroupInput): void {
    const fileidDriveRawValue = { ...this.getFormDefaults(), ...fileidDrive };
    form.reset(
      {
        ...fileidDriveRawValue,
        id: { value: fileidDriveRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): FileidDriveFormDefaults {
    return {
      id: null,
    };
  }
}
