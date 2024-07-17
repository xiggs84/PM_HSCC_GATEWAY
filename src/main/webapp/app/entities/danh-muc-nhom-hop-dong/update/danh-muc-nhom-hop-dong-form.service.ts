import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucNhomHopDong, NewDanhMucNhomHopDong } from '../danh-muc-nhom-hop-dong.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucNhomHopDong for edit and NewDanhMucNhomHopDongFormGroupInput for create.
 */
type DanhMucNhomHopDongFormGroupInput = IDanhMucNhomHopDong | PartialWithRequiredKeyOf<NewDanhMucNhomHopDong>;

type DanhMucNhomHopDongFormDefaults = Pick<NewDanhMucNhomHopDong, 'id'>;

type DanhMucNhomHopDongFormGroupContent = {
  id: FormControl<IDanhMucNhomHopDong['id'] | NewDanhMucNhomHopDong['id']>;
  idNhom: FormControl<IDanhMucNhomHopDong['idNhom']>;
  dienGiai: FormControl<IDanhMucNhomHopDong['dienGiai']>;
};

export type DanhMucNhomHopDongFormGroup = FormGroup<DanhMucNhomHopDongFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucNhomHopDongFormService {
  createDanhMucNhomHopDongFormGroup(danhMucNhomHopDong: DanhMucNhomHopDongFormGroupInput = { id: null }): DanhMucNhomHopDongFormGroup {
    const danhMucNhomHopDongRawValue = {
      ...this.getFormDefaults(),
      ...danhMucNhomHopDong,
    };
    return new FormGroup<DanhMucNhomHopDongFormGroupContent>({
      id: new FormControl(
        { value: danhMucNhomHopDongRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idNhom: new FormControl(danhMucNhomHopDongRawValue.idNhom),
      dienGiai: new FormControl(danhMucNhomHopDongRawValue.dienGiai),
    });
  }

  getDanhMucNhomHopDong(form: DanhMucNhomHopDongFormGroup): IDanhMucNhomHopDong | NewDanhMucNhomHopDong {
    return form.getRawValue() as IDanhMucNhomHopDong | NewDanhMucNhomHopDong;
  }

  resetForm(form: DanhMucNhomHopDongFormGroup, danhMucNhomHopDong: DanhMucNhomHopDongFormGroupInput): void {
    const danhMucNhomHopDongRawValue = { ...this.getFormDefaults(), ...danhMucNhomHopDong };
    form.reset(
      {
        ...danhMucNhomHopDongRawValue,
        id: { value: danhMucNhomHopDongRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucNhomHopDongFormDefaults {
    return {
      id: null,
    };
  }
}
