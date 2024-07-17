import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhsachDsNganchanTmp, NewDanhsachDsNganchanTmp } from '../danhsach-ds-nganchan-tmp.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhsachDsNganchanTmp for edit and NewDanhsachDsNganchanTmpFormGroupInput for create.
 */
type DanhsachDsNganchanTmpFormGroupInput = IDanhsachDsNganchanTmp | PartialWithRequiredKeyOf<NewDanhsachDsNganchanTmp>;

type DanhsachDsNganchanTmpFormDefaults = Pick<NewDanhsachDsNganchanTmp, 'id'>;

type DanhsachDsNganchanTmpFormGroupContent = {
  id: FormControl<IDanhsachDsNganchanTmp['id'] | NewDanhsachDsNganchanTmp['id']>;
  idDoiTuong: FormControl<IDanhsachDsNganchanTmp['idDoiTuong']>;
  ngayNganChan: FormControl<IDanhsachDsNganchanTmp['ngayNganChan']>;
  soHsCv: FormControl<IDanhsachDsNganchanTmp['soHsCv']>;
  soCc: FormControl<IDanhsachDsNganchanTmp['soCc']>;
  soVaoSo: FormControl<IDanhsachDsNganchanTmp['soVaoSo']>;
  moTa: FormControl<IDanhsachDsNganchanTmp['moTa']>;
  idDoituongGoc: FormControl<IDanhsachDsNganchanTmp['idDoituongGoc']>;
  loaiNganChan: FormControl<IDanhsachDsNganchanTmp['loaiNganChan']>;
  loaiDoiTuong: FormControl<IDanhsachDsNganchanTmp['loaiDoiTuong']>;
};

export type DanhsachDsNganchanTmpFormGroup = FormGroup<DanhsachDsNganchanTmpFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhsachDsNganchanTmpFormService {
  createDanhsachDsNganchanTmpFormGroup(
    danhsachDsNganchanTmp: DanhsachDsNganchanTmpFormGroupInput = { id: null },
  ): DanhsachDsNganchanTmpFormGroup {
    const danhsachDsNganchanTmpRawValue = {
      ...this.getFormDefaults(),
      ...danhsachDsNganchanTmp,
    };
    return new FormGroup<DanhsachDsNganchanTmpFormGroupContent>({
      id: new FormControl(
        { value: danhsachDsNganchanTmpRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDoiTuong: new FormControl(danhsachDsNganchanTmpRawValue.idDoiTuong),
      ngayNganChan: new FormControl(danhsachDsNganchanTmpRawValue.ngayNganChan),
      soHsCv: new FormControl(danhsachDsNganchanTmpRawValue.soHsCv),
      soCc: new FormControl(danhsachDsNganchanTmpRawValue.soCc),
      soVaoSo: new FormControl(danhsachDsNganchanTmpRawValue.soVaoSo),
      moTa: new FormControl(danhsachDsNganchanTmpRawValue.moTa),
      idDoituongGoc: new FormControl(danhsachDsNganchanTmpRawValue.idDoituongGoc),
      loaiNganChan: new FormControl(danhsachDsNganchanTmpRawValue.loaiNganChan),
      loaiDoiTuong: new FormControl(danhsachDsNganchanTmpRawValue.loaiDoiTuong),
    });
  }

  getDanhsachDsNganchanTmp(form: DanhsachDsNganchanTmpFormGroup): IDanhsachDsNganchanTmp | NewDanhsachDsNganchanTmp {
    return form.getRawValue() as IDanhsachDsNganchanTmp | NewDanhsachDsNganchanTmp;
  }

  resetForm(form: DanhsachDsNganchanTmpFormGroup, danhsachDsNganchanTmp: DanhsachDsNganchanTmpFormGroupInput): void {
    const danhsachDsNganchanTmpRawValue = { ...this.getFormDefaults(), ...danhsachDsNganchanTmp };
    form.reset(
      {
        ...danhsachDsNganchanTmpRawValue,
        id: { value: danhsachDsNganchanTmpRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhsachDsNganchanTmpFormDefaults {
    return {
      id: null,
    };
  }
}
