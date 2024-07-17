import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICauHinhHopDong, NewCauHinhHopDong } from '../cau-hinh-hop-dong.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICauHinhHopDong for edit and NewCauHinhHopDongFormGroupInput for create.
 */
type CauHinhHopDongFormGroupInput = ICauHinhHopDong | PartialWithRequiredKeyOf<NewCauHinhHopDong>;

type CauHinhHopDongFormDefaults = Pick<NewCauHinhHopDong, 'id'>;

type CauHinhHopDongFormGroupContent = {
  id: FormControl<ICauHinhHopDong['id'] | NewCauHinhHopDong['id']>;
  idLoaiHopDong: FormControl<ICauHinhHopDong['idLoaiHopDong']>;
  idDonVi: FormControl<ICauHinhHopDong['idDonVi']>;
  chieuDai: FormControl<ICauHinhHopDong['chieuDai']>;
  tienTo: FormControl<ICauHinhHopDong['tienTo']>;
  giaTri: FormControl<ICauHinhHopDong['giaTri']>;
  hienThi: FormControl<ICauHinhHopDong['hienThi']>;
  trangThai: FormControl<ICauHinhHopDong['trangThai']>;
};

export type CauHinhHopDongFormGroup = FormGroup<CauHinhHopDongFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CauHinhHopDongFormService {
  createCauHinhHopDongFormGroup(cauHinhHopDong: CauHinhHopDongFormGroupInput = { id: null }): CauHinhHopDongFormGroup {
    const cauHinhHopDongRawValue = {
      ...this.getFormDefaults(),
      ...cauHinhHopDong,
    };
    return new FormGroup<CauHinhHopDongFormGroupContent>({
      id: new FormControl(
        { value: cauHinhHopDongRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoaiHopDong: new FormControl(cauHinhHopDongRawValue.idLoaiHopDong),
      idDonVi: new FormControl(cauHinhHopDongRawValue.idDonVi),
      chieuDai: new FormControl(cauHinhHopDongRawValue.chieuDai),
      tienTo: new FormControl(cauHinhHopDongRawValue.tienTo),
      giaTri: new FormControl(cauHinhHopDongRawValue.giaTri),
      hienThi: new FormControl(cauHinhHopDongRawValue.hienThi),
      trangThai: new FormControl(cauHinhHopDongRawValue.trangThai),
    });
  }

  getCauHinhHopDong(form: CauHinhHopDongFormGroup): ICauHinhHopDong | NewCauHinhHopDong {
    return form.getRawValue() as ICauHinhHopDong | NewCauHinhHopDong;
  }

  resetForm(form: CauHinhHopDongFormGroup, cauHinhHopDong: CauHinhHopDongFormGroupInput): void {
    const cauHinhHopDongRawValue = { ...this.getFormDefaults(), ...cauHinhHopDong };
    form.reset(
      {
        ...cauHinhHopDongRawValue,
        id: { value: cauHinhHopDongRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CauHinhHopDongFormDefaults {
    return {
      id: null,
    };
  }
}
