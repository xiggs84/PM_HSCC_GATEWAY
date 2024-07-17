import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucLoaiDonVi, NewDanhMucLoaiDonVi } from '../danh-muc-loai-don-vi.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucLoaiDonVi for edit and NewDanhMucLoaiDonViFormGroupInput for create.
 */
type DanhMucLoaiDonViFormGroupInput = IDanhMucLoaiDonVi | PartialWithRequiredKeyOf<NewDanhMucLoaiDonVi>;

type DanhMucLoaiDonViFormDefaults = Pick<NewDanhMucLoaiDonVi, 'id'>;

type DanhMucLoaiDonViFormGroupContent = {
  id: FormControl<IDanhMucLoaiDonVi['id'] | NewDanhMucLoaiDonVi['id']>;
  idLoaiDv: FormControl<IDanhMucLoaiDonVi['idLoaiDv']>;
  dienGiai: FormControl<IDanhMucLoaiDonVi['dienGiai']>;
};

export type DanhMucLoaiDonViFormGroup = FormGroup<DanhMucLoaiDonViFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiDonViFormService {
  createDanhMucLoaiDonViFormGroup(danhMucLoaiDonVi: DanhMucLoaiDonViFormGroupInput = { id: null }): DanhMucLoaiDonViFormGroup {
    const danhMucLoaiDonViRawValue = {
      ...this.getFormDefaults(),
      ...danhMucLoaiDonVi,
    };
    return new FormGroup<DanhMucLoaiDonViFormGroupContent>({
      id: new FormControl(
        { value: danhMucLoaiDonViRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoaiDv: new FormControl(danhMucLoaiDonViRawValue.idLoaiDv),
      dienGiai: new FormControl(danhMucLoaiDonViRawValue.dienGiai),
    });
  }

  getDanhMucLoaiDonVi(form: DanhMucLoaiDonViFormGroup): IDanhMucLoaiDonVi | NewDanhMucLoaiDonVi {
    return form.getRawValue() as IDanhMucLoaiDonVi | NewDanhMucLoaiDonVi;
  }

  resetForm(form: DanhMucLoaiDonViFormGroup, danhMucLoaiDonVi: DanhMucLoaiDonViFormGroupInput): void {
    const danhMucLoaiDonViRawValue = { ...this.getFormDefaults(), ...danhMucLoaiDonVi };
    form.reset(
      {
        ...danhMucLoaiDonViRawValue,
        id: { value: danhMucLoaiDonViRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucLoaiDonViFormDefaults {
    return {
      id: null,
    };
  }
}
