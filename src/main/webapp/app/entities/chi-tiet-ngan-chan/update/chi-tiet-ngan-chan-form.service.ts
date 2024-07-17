import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IChiTietNganChan, NewChiTietNganChan } from '../chi-tiet-ngan-chan.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IChiTietNganChan for edit and NewChiTietNganChanFormGroupInput for create.
 */
type ChiTietNganChanFormGroupInput = IChiTietNganChan | PartialWithRequiredKeyOf<NewChiTietNganChan>;

type ChiTietNganChanFormDefaults = Pick<NewChiTietNganChan, 'id'>;

type ChiTietNganChanFormGroupContent = {
  id: FormControl<IChiTietNganChan['id'] | NewChiTietNganChan['id']>;
  stt: FormControl<IChiTietNganChan['stt']>;
  idDoiTuong: FormControl<IChiTietNganChan['idDoiTuong']>;
  ngayThaoTac: FormControl<IChiTietNganChan['ngayThaoTac']>;
  loaiDoiTuong: FormControl<IChiTietNganChan['loaiDoiTuong']>;
  soHsCv: FormControl<IChiTietNganChan['soHsCv']>;
  soCc: FormControl<IChiTietNganChan['soCc']>;
  soVaoSo: FormControl<IChiTietNganChan['soVaoSo']>;
  moTa: FormControl<IChiTietNganChan['moTa']>;
  ngayNganChan: FormControl<IChiTietNganChan['ngayNganChan']>;
  ngayBdNganChan: FormControl<IChiTietNganChan['ngayBdNganChan']>;
  ngayKtNganChan: FormControl<IChiTietNganChan['ngayKtNganChan']>;
  trangThai: FormControl<IChiTietNganChan['trangThai']>;
  nguoiThaoTac: FormControl<IChiTietNganChan['nguoiThaoTac']>;
  loaiNganChan: FormControl<IChiTietNganChan['loaiNganChan']>;
  ngayCongVan: FormControl<IChiTietNganChan['ngayCongVan']>;
};

export type ChiTietNganChanFormGroup = FormGroup<ChiTietNganChanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ChiTietNganChanFormService {
  createChiTietNganChanFormGroup(chiTietNganChan: ChiTietNganChanFormGroupInput = { id: null }): ChiTietNganChanFormGroup {
    const chiTietNganChanRawValue = {
      ...this.getFormDefaults(),
      ...chiTietNganChan,
    };
    return new FormGroup<ChiTietNganChanFormGroupContent>({
      id: new FormControl(
        { value: chiTietNganChanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      stt: new FormControl(chiTietNganChanRawValue.stt),
      idDoiTuong: new FormControl(chiTietNganChanRawValue.idDoiTuong),
      ngayThaoTac: new FormControl(chiTietNganChanRawValue.ngayThaoTac),
      loaiDoiTuong: new FormControl(chiTietNganChanRawValue.loaiDoiTuong),
      soHsCv: new FormControl(chiTietNganChanRawValue.soHsCv),
      soCc: new FormControl(chiTietNganChanRawValue.soCc),
      soVaoSo: new FormControl(chiTietNganChanRawValue.soVaoSo),
      moTa: new FormControl(chiTietNganChanRawValue.moTa),
      ngayNganChan: new FormControl(chiTietNganChanRawValue.ngayNganChan),
      ngayBdNganChan: new FormControl(chiTietNganChanRawValue.ngayBdNganChan),
      ngayKtNganChan: new FormControl(chiTietNganChanRawValue.ngayKtNganChan),
      trangThai: new FormControl(chiTietNganChanRawValue.trangThai),
      nguoiThaoTac: new FormControl(chiTietNganChanRawValue.nguoiThaoTac),
      loaiNganChan: new FormControl(chiTietNganChanRawValue.loaiNganChan),
      ngayCongVan: new FormControl(chiTietNganChanRawValue.ngayCongVan),
    });
  }

  getChiTietNganChan(form: ChiTietNganChanFormGroup): IChiTietNganChan | NewChiTietNganChan {
    return form.getRawValue() as IChiTietNganChan | NewChiTietNganChan;
  }

  resetForm(form: ChiTietNganChanFormGroup, chiTietNganChan: ChiTietNganChanFormGroupInput): void {
    const chiTietNganChanRawValue = { ...this.getFormDefaults(), ...chiTietNganChan };
    form.reset(
      {
        ...chiTietNganChanRawValue,
        id: { value: chiTietNganChanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ChiTietNganChanFormDefaults {
    return {
      id: null,
    };
  }
}
