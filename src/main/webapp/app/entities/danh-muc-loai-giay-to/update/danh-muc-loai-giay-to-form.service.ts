import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucLoaiGiayTo, NewDanhMucLoaiGiayTo } from '../danh-muc-loai-giay-to.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucLoaiGiayTo for edit and NewDanhMucLoaiGiayToFormGroupInput for create.
 */
type DanhMucLoaiGiayToFormGroupInput = IDanhMucLoaiGiayTo | PartialWithRequiredKeyOf<NewDanhMucLoaiGiayTo>;

type DanhMucLoaiGiayToFormDefaults = Pick<NewDanhMucLoaiGiayTo, 'id'>;

type DanhMucLoaiGiayToFormGroupContent = {
  id: FormControl<IDanhMucLoaiGiayTo['id'] | NewDanhMucLoaiGiayTo['id']>;
  idLoaiGiayTo: FormControl<IDanhMucLoaiGiayTo['idLoaiGiayTo']>;
  dienGiai: FormControl<IDanhMucLoaiGiayTo['dienGiai']>;
};

export type DanhMucLoaiGiayToFormGroup = FormGroup<DanhMucLoaiGiayToFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiGiayToFormService {
  createDanhMucLoaiGiayToFormGroup(danhMucLoaiGiayTo: DanhMucLoaiGiayToFormGroupInput = { id: null }): DanhMucLoaiGiayToFormGroup {
    const danhMucLoaiGiayToRawValue = {
      ...this.getFormDefaults(),
      ...danhMucLoaiGiayTo,
    };
    return new FormGroup<DanhMucLoaiGiayToFormGroupContent>({
      id: new FormControl(
        { value: danhMucLoaiGiayToRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoaiGiayTo: new FormControl(danhMucLoaiGiayToRawValue.idLoaiGiayTo),
      dienGiai: new FormControl(danhMucLoaiGiayToRawValue.dienGiai),
    });
  }

  getDanhMucLoaiGiayTo(form: DanhMucLoaiGiayToFormGroup): IDanhMucLoaiGiayTo | NewDanhMucLoaiGiayTo {
    return form.getRawValue() as IDanhMucLoaiGiayTo | NewDanhMucLoaiGiayTo;
  }

  resetForm(form: DanhMucLoaiGiayToFormGroup, danhMucLoaiGiayTo: DanhMucLoaiGiayToFormGroupInput): void {
    const danhMucLoaiGiayToRawValue = { ...this.getFormDefaults(), ...danhMucLoaiGiayTo };
    form.reset(
      {
        ...danhMucLoaiGiayToRawValue,
        id: { value: danhMucLoaiGiayToRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucLoaiGiayToFormDefaults {
    return {
      id: null,
    };
  }
}
