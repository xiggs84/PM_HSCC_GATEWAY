import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILichSuGiaoDich, NewLichSuGiaoDich } from '../lich-su-giao-dich.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILichSuGiaoDich for edit and NewLichSuGiaoDichFormGroupInput for create.
 */
type LichSuGiaoDichFormGroupInput = ILichSuGiaoDich | PartialWithRequiredKeyOf<NewLichSuGiaoDich>;

type LichSuGiaoDichFormDefaults = Pick<NewLichSuGiaoDich, 'id'>;

type LichSuGiaoDichFormGroupContent = {
  id: FormControl<ILichSuGiaoDich['id'] | NewLichSuGiaoDich['id']>;
  idTaiSan: FormControl<ILichSuGiaoDich['idTaiSan']>;
  idDuongSu: FormControl<ILichSuGiaoDich['idDuongSu']>;
  trangThai: FormControl<ILichSuGiaoDich['trangThai']>;
  ngayThaoTac: FormControl<ILichSuGiaoDich['ngayThaoTac']>;
  idHopDong: FormControl<ILichSuGiaoDich['idHopDong']>;
  idLoaiHopDong: FormControl<ILichSuGiaoDich['idLoaiHopDong']>;
  idChungThuc: FormControl<ILichSuGiaoDich['idChungThuc']>;
};

export type LichSuGiaoDichFormGroup = FormGroup<LichSuGiaoDichFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LichSuGiaoDichFormService {
  createLichSuGiaoDichFormGroup(lichSuGiaoDich: LichSuGiaoDichFormGroupInput = { id: null }): LichSuGiaoDichFormGroup {
    const lichSuGiaoDichRawValue = {
      ...this.getFormDefaults(),
      ...lichSuGiaoDich,
    };
    return new FormGroup<LichSuGiaoDichFormGroupContent>({
      id: new FormControl(
        { value: lichSuGiaoDichRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idTaiSan: new FormControl(lichSuGiaoDichRawValue.idTaiSan),
      idDuongSu: new FormControl(lichSuGiaoDichRawValue.idDuongSu),
      trangThai: new FormControl(lichSuGiaoDichRawValue.trangThai),
      ngayThaoTac: new FormControl(lichSuGiaoDichRawValue.ngayThaoTac),
      idHopDong: new FormControl(lichSuGiaoDichRawValue.idHopDong),
      idLoaiHopDong: new FormControl(lichSuGiaoDichRawValue.idLoaiHopDong),
      idChungThuc: new FormControl(lichSuGiaoDichRawValue.idChungThuc),
    });
  }

  getLichSuGiaoDich(form: LichSuGiaoDichFormGroup): ILichSuGiaoDich | NewLichSuGiaoDich {
    return form.getRawValue() as ILichSuGiaoDich | NewLichSuGiaoDich;
  }

  resetForm(form: LichSuGiaoDichFormGroup, lichSuGiaoDich: LichSuGiaoDichFormGroupInput): void {
    const lichSuGiaoDichRawValue = { ...this.getFormDefaults(), ...lichSuGiaoDich };
    form.reset(
      {
        ...lichSuGiaoDichRawValue,
        id: { value: lichSuGiaoDichRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LichSuGiaoDichFormDefaults {
    return {
      id: null,
    };
  }
}
