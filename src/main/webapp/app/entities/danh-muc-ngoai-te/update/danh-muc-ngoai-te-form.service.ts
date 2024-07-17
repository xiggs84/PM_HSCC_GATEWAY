import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucNgoaiTe, NewDanhMucNgoaiTe } from '../danh-muc-ngoai-te.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucNgoaiTe for edit and NewDanhMucNgoaiTeFormGroupInput for create.
 */
type DanhMucNgoaiTeFormGroupInput = IDanhMucNgoaiTe | PartialWithRequiredKeyOf<NewDanhMucNgoaiTe>;

type DanhMucNgoaiTeFormDefaults = Pick<NewDanhMucNgoaiTe, 'id'>;

type DanhMucNgoaiTeFormGroupContent = {
  id: FormControl<IDanhMucNgoaiTe['id'] | NewDanhMucNgoaiTe['id']>;
  idLoai: FormControl<IDanhMucNgoaiTe['idLoai']>;
  dienGiai: FormControl<IDanhMucNgoaiTe['dienGiai']>;
};

export type DanhMucNgoaiTeFormGroup = FormGroup<DanhMucNgoaiTeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucNgoaiTeFormService {
  createDanhMucNgoaiTeFormGroup(danhMucNgoaiTe: DanhMucNgoaiTeFormGroupInput = { id: null }): DanhMucNgoaiTeFormGroup {
    const danhMucNgoaiTeRawValue = {
      ...this.getFormDefaults(),
      ...danhMucNgoaiTe,
    };
    return new FormGroup<DanhMucNgoaiTeFormGroupContent>({
      id: new FormControl(
        { value: danhMucNgoaiTeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoai: new FormControl(danhMucNgoaiTeRawValue.idLoai),
      dienGiai: new FormControl(danhMucNgoaiTeRawValue.dienGiai),
    });
  }

  getDanhMucNgoaiTe(form: DanhMucNgoaiTeFormGroup): IDanhMucNgoaiTe | NewDanhMucNgoaiTe {
    return form.getRawValue() as IDanhMucNgoaiTe | NewDanhMucNgoaiTe;
  }

  resetForm(form: DanhMucNgoaiTeFormGroup, danhMucNgoaiTe: DanhMucNgoaiTeFormGroupInput): void {
    const danhMucNgoaiTeRawValue = { ...this.getFormDefaults(), ...danhMucNgoaiTe };
    form.reset(
      {
        ...danhMucNgoaiTeRawValue,
        id: { value: danhMucNgoaiTeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucNgoaiTeFormDefaults {
    return {
      id: null,
    };
  }
}
