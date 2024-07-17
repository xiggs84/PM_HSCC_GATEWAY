import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucDichVu, NewDanhMucDichVu } from '../danh-muc-dich-vu.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucDichVu for edit and NewDanhMucDichVuFormGroupInput for create.
 */
type DanhMucDichVuFormGroupInput = IDanhMucDichVu | PartialWithRequiredKeyOf<NewDanhMucDichVu>;

type DanhMucDichVuFormDefaults = Pick<NewDanhMucDichVu, 'id'>;

type DanhMucDichVuFormGroupContent = {
  id: FormControl<IDanhMucDichVu['id'] | NewDanhMucDichVu['id']>;
  dienGiai: FormControl<IDanhMucDichVu['dienGiai']>;
  donViTinh: FormControl<IDanhMucDichVu['donViTinh']>;
  donGia: FormControl<IDanhMucDichVu['donGia']>;
  idDichVu: FormControl<IDanhMucDichVu['idDichVu']>;
};

export type DanhMucDichVuFormGroup = FormGroup<DanhMucDichVuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucDichVuFormService {
  createDanhMucDichVuFormGroup(danhMucDichVu: DanhMucDichVuFormGroupInput = { id: null }): DanhMucDichVuFormGroup {
    const danhMucDichVuRawValue = {
      ...this.getFormDefaults(),
      ...danhMucDichVu,
    };
    return new FormGroup<DanhMucDichVuFormGroupContent>({
      id: new FormControl(
        { value: danhMucDichVuRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dienGiai: new FormControl(danhMucDichVuRawValue.dienGiai),
      donViTinh: new FormControl(danhMucDichVuRawValue.donViTinh),
      donGia: new FormControl(danhMucDichVuRawValue.donGia),
      idDichVu: new FormControl(danhMucDichVuRawValue.idDichVu),
    });
  }

  getDanhMucDichVu(form: DanhMucDichVuFormGroup): IDanhMucDichVu | NewDanhMucDichVu {
    return form.getRawValue() as IDanhMucDichVu | NewDanhMucDichVu;
  }

  resetForm(form: DanhMucDichVuFormGroup, danhMucDichVu: DanhMucDichVuFormGroupInput): void {
    const danhMucDichVuRawValue = { ...this.getFormDefaults(), ...danhMucDichVu };
    form.reset(
      {
        ...danhMucDichVuRawValue,
        id: { value: danhMucDichVuRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucDichVuFormDefaults {
    return {
      id: null,
    };
  }
}
