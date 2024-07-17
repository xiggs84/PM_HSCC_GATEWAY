import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucQuocGia, NewDanhMucQuocGia } from '../danh-muc-quoc-gia.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucQuocGia for edit and NewDanhMucQuocGiaFormGroupInput for create.
 */
type DanhMucQuocGiaFormGroupInput = IDanhMucQuocGia | PartialWithRequiredKeyOf<NewDanhMucQuocGia>;

type DanhMucQuocGiaFormDefaults = Pick<NewDanhMucQuocGia, 'id'>;

type DanhMucQuocGiaFormGroupContent = {
  id: FormControl<IDanhMucQuocGia['id'] | NewDanhMucQuocGia['id']>;
  idQuocGia: FormControl<IDanhMucQuocGia['idQuocGia']>;
  tenQuocGia: FormControl<IDanhMucQuocGia['tenQuocGia']>;
  tenTiengAnh: FormControl<IDanhMucQuocGia['tenTiengAnh']>;
};

export type DanhMucQuocGiaFormGroup = FormGroup<DanhMucQuocGiaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucQuocGiaFormService {
  createDanhMucQuocGiaFormGroup(danhMucQuocGia: DanhMucQuocGiaFormGroupInput = { id: null }): DanhMucQuocGiaFormGroup {
    const danhMucQuocGiaRawValue = {
      ...this.getFormDefaults(),
      ...danhMucQuocGia,
    };
    return new FormGroup<DanhMucQuocGiaFormGroupContent>({
      id: new FormControl(
        { value: danhMucQuocGiaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idQuocGia: new FormControl(danhMucQuocGiaRawValue.idQuocGia),
      tenQuocGia: new FormControl(danhMucQuocGiaRawValue.tenQuocGia),
      tenTiengAnh: new FormControl(danhMucQuocGiaRawValue.tenTiengAnh),
    });
  }

  getDanhMucQuocGia(form: DanhMucQuocGiaFormGroup): IDanhMucQuocGia | NewDanhMucQuocGia {
    return form.getRawValue() as IDanhMucQuocGia | NewDanhMucQuocGia;
  }

  resetForm(form: DanhMucQuocGiaFormGroup, danhMucQuocGia: DanhMucQuocGiaFormGroupInput): void {
    const danhMucQuocGiaRawValue = { ...this.getFormDefaults(), ...danhMucQuocGia };
    form.reset(
      {
        ...danhMucQuocGiaRawValue,
        id: { value: danhMucQuocGiaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucQuocGiaFormDefaults {
    return {
      id: null,
    };
  }
}
