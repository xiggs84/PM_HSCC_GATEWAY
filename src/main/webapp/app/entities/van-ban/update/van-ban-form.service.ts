import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IVanBan, NewVanBan } from '../van-ban.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVanBan for edit and NewVanBanFormGroupInput for create.
 */
type VanBanFormGroupInput = IVanBan | PartialWithRequiredKeyOf<NewVanBan>;

type VanBanFormDefaults = Pick<NewVanBan, 'id'>;

type VanBanFormGroupContent = {
  id: FormControl<IVanBan['id'] | NewVanBan['id']>;
  idVanBan: FormControl<IVanBan['idVanBan']>;
  dienGiai: FormControl<IVanBan['dienGiai']>;
  tenFile: FormControl<IVanBan['tenFile']>;
  srcFile: FormControl<IVanBan['srcFile']>;
  idLoaiVb: FormControl<IVanBan['idLoaiVb']>;
  trangThai: FormControl<IVanBan['trangThai']>;
  ngayThaoTac: FormControl<IVanBan['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IVanBan['nguoiThaoTac']>;
  idDonVi: FormControl<IVanBan['idDonVi']>;
  idVbGoc: FormControl<IVanBan['idVbGoc']>;
};

export type VanBanFormGroup = FormGroup<VanBanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VanBanFormService {
  createVanBanFormGroup(vanBan: VanBanFormGroupInput = { id: null }): VanBanFormGroup {
    const vanBanRawValue = {
      ...this.getFormDefaults(),
      ...vanBan,
    };
    return new FormGroup<VanBanFormGroupContent>({
      id: new FormControl(
        { value: vanBanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idVanBan: new FormControl(vanBanRawValue.idVanBan),
      dienGiai: new FormControl(vanBanRawValue.dienGiai),
      tenFile: new FormControl(vanBanRawValue.tenFile),
      srcFile: new FormControl(vanBanRawValue.srcFile),
      idLoaiVb: new FormControl(vanBanRawValue.idLoaiVb),
      trangThai: new FormControl(vanBanRawValue.trangThai),
      ngayThaoTac: new FormControl(vanBanRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(vanBanRawValue.nguoiThaoTac),
      idDonVi: new FormControl(vanBanRawValue.idDonVi),
      idVbGoc: new FormControl(vanBanRawValue.idVbGoc),
    });
  }

  getVanBan(form: VanBanFormGroup): IVanBan | NewVanBan {
    return form.getRawValue() as IVanBan | NewVanBan;
  }

  resetForm(form: VanBanFormGroup, vanBan: VanBanFormGroupInput): void {
    const vanBanRawValue = { ...this.getFormDefaults(), ...vanBan };
    form.reset(
      {
        ...vanBanRawValue,
        id: { value: vanBanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): VanBanFormDefaults {
    return {
      id: null,
    };
  }
}
