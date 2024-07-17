import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDuongSu, NewDuongSu } from '../duong-su.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDuongSu for edit and NewDuongSuFormGroupInput for create.
 */
type DuongSuFormGroupInput = IDuongSu | PartialWithRequiredKeyOf<NewDuongSu>;

type DuongSuFormDefaults = Pick<NewDuongSu, 'id'>;

type DuongSuFormGroupContent = {
  id: FormControl<IDuongSu['id'] | NewDuongSu['id']>;
  idDuongSu: FormControl<IDuongSu['idDuongSu']>;
  tenDuongSu: FormControl<IDuongSu['tenDuongSu']>;
  diaChi: FormControl<IDuongSu['diaChi']>;
  trangThai: FormControl<IDuongSu['trangThai']>;
  thongTinDs: FormControl<IDuongSu['thongTinDs']>;
  ngayThaoTac: FormControl<IDuongSu['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDuongSu['nguoiThaoTac']>;
  idDsGoc: FormControl<IDuongSu['idDsGoc']>;
  idMaster: FormControl<IDuongSu['idMaster']>;
  idDonVi: FormControl<IDuongSu['idDonVi']>;
  strSearch: FormControl<IDuongSu['strSearch']>;
  soGiayTo: FormControl<IDuongSu['soGiayTo']>;
  idLoaiNganChan: FormControl<IDuongSu['idLoaiNganChan']>;
  syncStatus: FormControl<IDuongSu['syncStatus']>;
  idTinhTrang: FormControl<IDuongSu['idTinhTrang']>;
  idLoaiDs: FormControl<IDuongSu['idLoaiDs']>;
};

export type DuongSuFormGroup = FormGroup<DuongSuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DuongSuFormService {
  createDuongSuFormGroup(duongSu: DuongSuFormGroupInput = { id: null }): DuongSuFormGroup {
    const duongSuRawValue = {
      ...this.getFormDefaults(),
      ...duongSu,
    };
    return new FormGroup<DuongSuFormGroupContent>({
      id: new FormControl(
        { value: duongSuRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDuongSu: new FormControl(duongSuRawValue.idDuongSu),
      tenDuongSu: new FormControl(duongSuRawValue.tenDuongSu),
      diaChi: new FormControl(duongSuRawValue.diaChi),
      trangThai: new FormControl(duongSuRawValue.trangThai),
      thongTinDs: new FormControl(duongSuRawValue.thongTinDs),
      ngayThaoTac: new FormControl(duongSuRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(duongSuRawValue.nguoiThaoTac),
      idDsGoc: new FormControl(duongSuRawValue.idDsGoc),
      idMaster: new FormControl(duongSuRawValue.idMaster),
      idDonVi: new FormControl(duongSuRawValue.idDonVi),
      strSearch: new FormControl(duongSuRawValue.strSearch),
      soGiayTo: new FormControl(duongSuRawValue.soGiayTo),
      idLoaiNganChan: new FormControl(duongSuRawValue.idLoaiNganChan),
      syncStatus: new FormControl(duongSuRawValue.syncStatus),
      idTinhTrang: new FormControl(duongSuRawValue.idTinhTrang),
      idLoaiDs: new FormControl(duongSuRawValue.idLoaiDs),
    });
  }

  getDuongSu(form: DuongSuFormGroup): IDuongSu | NewDuongSu {
    return form.getRawValue() as IDuongSu | NewDuongSu;
  }

  resetForm(form: DuongSuFormGroup, duongSu: DuongSuFormGroupInput): void {
    const duongSuRawValue = { ...this.getFormDefaults(), ...duongSu };
    form.reset(
      {
        ...duongSuRawValue,
        id: { value: duongSuRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DuongSuFormDefaults {
    return {
      id: null,
    };
  }
}
