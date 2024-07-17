import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucLoaiVanBan, NewDanhMucLoaiVanBan } from '../danh-muc-loai-van-ban.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucLoaiVanBan for edit and NewDanhMucLoaiVanBanFormGroupInput for create.
 */
type DanhMucLoaiVanBanFormGroupInput = IDanhMucLoaiVanBan | PartialWithRequiredKeyOf<NewDanhMucLoaiVanBan>;

type DanhMucLoaiVanBanFormDefaults = Pick<NewDanhMucLoaiVanBan, 'id'>;

type DanhMucLoaiVanBanFormGroupContent = {
  id: FormControl<IDanhMucLoaiVanBan['id'] | NewDanhMucLoaiVanBan['id']>;
  idLoaiVb: FormControl<IDanhMucLoaiVanBan['idLoaiVb']>;
  dienGiai: FormControl<IDanhMucLoaiVanBan['dienGiai']>;
  idLoaiHopDong: FormControl<IDanhMucLoaiVanBan['idLoaiHopDong']>;
};

export type DanhMucLoaiVanBanFormGroup = FormGroup<DanhMucLoaiVanBanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiVanBanFormService {
  createDanhMucLoaiVanBanFormGroup(danhMucLoaiVanBan: DanhMucLoaiVanBanFormGroupInput = { id: null }): DanhMucLoaiVanBanFormGroup {
    const danhMucLoaiVanBanRawValue = {
      ...this.getFormDefaults(),
      ...danhMucLoaiVanBan,
    };
    return new FormGroup<DanhMucLoaiVanBanFormGroupContent>({
      id: new FormControl(
        { value: danhMucLoaiVanBanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoaiVb: new FormControl(danhMucLoaiVanBanRawValue.idLoaiVb),
      dienGiai: new FormControl(danhMucLoaiVanBanRawValue.dienGiai),
      idLoaiHopDong: new FormControl(danhMucLoaiVanBanRawValue.idLoaiHopDong),
    });
  }

  getDanhMucLoaiVanBan(form: DanhMucLoaiVanBanFormGroup): IDanhMucLoaiVanBan | NewDanhMucLoaiVanBan {
    return form.getRawValue() as IDanhMucLoaiVanBan | NewDanhMucLoaiVanBan;
  }

  resetForm(form: DanhMucLoaiVanBanFormGroup, danhMucLoaiVanBan: DanhMucLoaiVanBanFormGroupInput): void {
    const danhMucLoaiVanBanRawValue = { ...this.getFormDefaults(), ...danhMucLoaiVanBan };
    form.reset(
      {
        ...danhMucLoaiVanBanRawValue,
        id: { value: danhMucLoaiVanBanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucLoaiVanBanFormDefaults {
    return {
      id: null,
    };
  }
}
