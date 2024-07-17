import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITaiSanDatNha, NewTaiSanDatNha } from '../tai-san-dat-nha.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaiSanDatNha for edit and NewTaiSanDatNhaFormGroupInput for create.
 */
type TaiSanDatNhaFormGroupInput = ITaiSanDatNha | PartialWithRequiredKeyOf<NewTaiSanDatNha>;

type TaiSanDatNhaFormDefaults = Pick<NewTaiSanDatNha, 'id'>;

type TaiSanDatNhaFormGroupContent = {
  id: FormControl<ITaiSanDatNha['id'] | NewTaiSanDatNha['id']>;
  idTaiSan: FormControl<ITaiSanDatNha['idTaiSan']>;
  tenTaiSan: FormControl<ITaiSanDatNha['tenTaiSan']>;
  trangThai: FormControl<ITaiSanDatNha['trangThai']>;
  thongTinTs: FormControl<ITaiSanDatNha['thongTinTs']>;
  idLoaiTs: FormControl<ITaiSanDatNha['idLoaiTs']>;
  ghiChu: FormControl<ITaiSanDatNha['ghiChu']>;
  ngayThaoTac: FormControl<ITaiSanDatNha['ngayThaoTac']>;
  nguoiThaoTac: FormControl<ITaiSanDatNha['nguoiThaoTac']>;
  idDuongSu: FormControl<ITaiSanDatNha['idDuongSu']>;
  idTsGoc: FormControl<ITaiSanDatNha['idTsGoc']>;
  maTaiSan: FormControl<ITaiSanDatNha['maTaiSan']>;
  idTinhTrang: FormControl<ITaiSanDatNha['idTinhTrang']>;
  idLoaiNganChan: FormControl<ITaiSanDatNha['idLoaiNganChan']>;
  ngayBdNganChan: FormControl<ITaiSanDatNha['ngayBdNganChan']>;
  ngayKtNganChan: FormControl<ITaiSanDatNha['ngayKtNganChan']>;
  idMaster: FormControl<ITaiSanDatNha['idMaster']>;
  strSearch: FormControl<ITaiSanDatNha['strSearch']>;
  idDonVi: FormControl<ITaiSanDatNha['idDonVi']>;
  soHsCv: FormControl<ITaiSanDatNha['soHsCv']>;
  soCc: FormControl<ITaiSanDatNha['soCc']>;
  soVaoSo: FormControl<ITaiSanDatNha['soVaoSo']>;
  moTa: FormControl<ITaiSanDatNha['moTa']>;
  loaiNganChan: FormControl<ITaiSanDatNha['loaiNganChan']>;
};

export type TaiSanDatNhaFormGroup = FormGroup<TaiSanDatNhaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaiSanDatNhaFormService {
  createTaiSanDatNhaFormGroup(taiSanDatNha: TaiSanDatNhaFormGroupInput = { id: null }): TaiSanDatNhaFormGroup {
    const taiSanDatNhaRawValue = {
      ...this.getFormDefaults(),
      ...taiSanDatNha,
    };
    return new FormGroup<TaiSanDatNhaFormGroupContent>({
      id: new FormControl(
        { value: taiSanDatNhaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idTaiSan: new FormControl(taiSanDatNhaRawValue.idTaiSan),
      tenTaiSan: new FormControl(taiSanDatNhaRawValue.tenTaiSan),
      trangThai: new FormControl(taiSanDatNhaRawValue.trangThai),
      thongTinTs: new FormControl(taiSanDatNhaRawValue.thongTinTs),
      idLoaiTs: new FormControl(taiSanDatNhaRawValue.idLoaiTs),
      ghiChu: new FormControl(taiSanDatNhaRawValue.ghiChu),
      ngayThaoTac: new FormControl(taiSanDatNhaRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(taiSanDatNhaRawValue.nguoiThaoTac),
      idDuongSu: new FormControl(taiSanDatNhaRawValue.idDuongSu),
      idTsGoc: new FormControl(taiSanDatNhaRawValue.idTsGoc),
      maTaiSan: new FormControl(taiSanDatNhaRawValue.maTaiSan),
      idTinhTrang: new FormControl(taiSanDatNhaRawValue.idTinhTrang),
      idLoaiNganChan: new FormControl(taiSanDatNhaRawValue.idLoaiNganChan),
      ngayBdNganChan: new FormControl(taiSanDatNhaRawValue.ngayBdNganChan),
      ngayKtNganChan: new FormControl(taiSanDatNhaRawValue.ngayKtNganChan),
      idMaster: new FormControl(taiSanDatNhaRawValue.idMaster),
      strSearch: new FormControl(taiSanDatNhaRawValue.strSearch),
      idDonVi: new FormControl(taiSanDatNhaRawValue.idDonVi),
      soHsCv: new FormControl(taiSanDatNhaRawValue.soHsCv),
      soCc: new FormControl(taiSanDatNhaRawValue.soCc),
      soVaoSo: new FormControl(taiSanDatNhaRawValue.soVaoSo),
      moTa: new FormControl(taiSanDatNhaRawValue.moTa),
      loaiNganChan: new FormControl(taiSanDatNhaRawValue.loaiNganChan),
    });
  }

  getTaiSanDatNha(form: TaiSanDatNhaFormGroup): ITaiSanDatNha | NewTaiSanDatNha {
    return form.getRawValue() as ITaiSanDatNha | NewTaiSanDatNha;
  }

  resetForm(form: TaiSanDatNhaFormGroup, taiSanDatNha: TaiSanDatNhaFormGroupInput): void {
    const taiSanDatNhaRawValue = { ...this.getFormDefaults(), ...taiSanDatNha };
    form.reset(
      {
        ...taiSanDatNhaRawValue,
        id: { value: taiSanDatNhaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaiSanDatNhaFormDefaults {
    return {
      id: null,
    };
  }
}
