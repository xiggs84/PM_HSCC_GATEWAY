import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucNgonNgu, NewDanhMucNgonNgu } from '../danh-muc-ngon-ngu.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucNgonNgu for edit and NewDanhMucNgonNguFormGroupInput for create.
 */
type DanhMucNgonNguFormGroupInput = IDanhMucNgonNgu | PartialWithRequiredKeyOf<NewDanhMucNgonNgu>;

type DanhMucNgonNguFormDefaults = Pick<NewDanhMucNgonNgu, 'id'>;

type DanhMucNgonNguFormGroupContent = {
  id: FormControl<IDanhMucNgonNgu['id'] | NewDanhMucNgonNgu['id']>;
  idNgonNgu: FormControl<IDanhMucNgonNgu['idNgonNgu']>;
  dienGiai: FormControl<IDanhMucNgonNgu['dienGiai']>;
  vietTat: FormControl<IDanhMucNgonNgu['vietTat']>;
};

export type DanhMucNgonNguFormGroup = FormGroup<DanhMucNgonNguFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucNgonNguFormService {
  createDanhMucNgonNguFormGroup(danhMucNgonNgu: DanhMucNgonNguFormGroupInput = { id: null }): DanhMucNgonNguFormGroup {
    const danhMucNgonNguRawValue = {
      ...this.getFormDefaults(),
      ...danhMucNgonNgu,
    };
    return new FormGroup<DanhMucNgonNguFormGroupContent>({
      id: new FormControl(
        { value: danhMucNgonNguRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idNgonNgu: new FormControl(danhMucNgonNguRawValue.idNgonNgu),
      dienGiai: new FormControl(danhMucNgonNguRawValue.dienGiai),
      vietTat: new FormControl(danhMucNgonNguRawValue.vietTat),
    });
  }

  getDanhMucNgonNgu(form: DanhMucNgonNguFormGroup): IDanhMucNgonNgu | NewDanhMucNgonNgu {
    return form.getRawValue() as IDanhMucNgonNgu | NewDanhMucNgonNgu;
  }

  resetForm(form: DanhMucNgonNguFormGroup, danhMucNgonNgu: DanhMucNgonNguFormGroupInput): void {
    const danhMucNgonNguRawValue = { ...this.getFormDefaults(), ...danhMucNgonNgu };
    form.reset(
      {
        ...danhMucNgonNguRawValue,
        id: { value: danhMucNgonNguRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucNgonNguFormDefaults {
    return {
      id: null,
    };
  }
}
