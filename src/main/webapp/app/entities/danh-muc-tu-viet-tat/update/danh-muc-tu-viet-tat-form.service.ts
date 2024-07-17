import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IDanhMucTuVietTat, NewDanhMucTuVietTat } from '../danh-muc-tu-viet-tat.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucTuVietTat for edit and NewDanhMucTuVietTatFormGroupInput for create.
 */
type DanhMucTuVietTatFormGroupInput = IDanhMucTuVietTat | PartialWithRequiredKeyOf<NewDanhMucTuVietTat>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IDanhMucTuVietTat | NewDanhMucTuVietTat> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

type DanhMucTuVietTatFormRawValue = FormValueOf<IDanhMucTuVietTat>;

type NewDanhMucTuVietTatFormRawValue = FormValueOf<NewDanhMucTuVietTat>;

type DanhMucTuVietTatFormDefaults = Pick<NewDanhMucTuVietTat, 'id' | 'ngayThaoTac'>;

type DanhMucTuVietTatFormGroupContent = {
  id: FormControl<DanhMucTuVietTatFormRawValue['id'] | NewDanhMucTuVietTat['id']>;
  idVietTat: FormControl<DanhMucTuVietTatFormRawValue['idVietTat']>;
  tuVietTat: FormControl<DanhMucTuVietTatFormRawValue['tuVietTat']>;
  dienGiai: FormControl<DanhMucTuVietTatFormRawValue['dienGiai']>;
  idDonVi: FormControl<DanhMucTuVietTatFormRawValue['idDonVi']>;
  nguoiThaoTac: FormControl<DanhMucTuVietTatFormRawValue['nguoiThaoTac']>;
  ngayThaoTac: FormControl<DanhMucTuVietTatFormRawValue['ngayThaoTac']>;
  trangThai: FormControl<DanhMucTuVietTatFormRawValue['trangThai']>;
};

export type DanhMucTuVietTatFormGroup = FormGroup<DanhMucTuVietTatFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucTuVietTatFormService {
  createDanhMucTuVietTatFormGroup(danhMucTuVietTat: DanhMucTuVietTatFormGroupInput = { id: null }): DanhMucTuVietTatFormGroup {
    const danhMucTuVietTatRawValue = this.convertDanhMucTuVietTatToDanhMucTuVietTatRawValue({
      ...this.getFormDefaults(),
      ...danhMucTuVietTat,
    });
    return new FormGroup<DanhMucTuVietTatFormGroupContent>({
      id: new FormControl(
        { value: danhMucTuVietTatRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idVietTat: new FormControl(danhMucTuVietTatRawValue.idVietTat),
      tuVietTat: new FormControl(danhMucTuVietTatRawValue.tuVietTat),
      dienGiai: new FormControl(danhMucTuVietTatRawValue.dienGiai),
      idDonVi: new FormControl(danhMucTuVietTatRawValue.idDonVi),
      nguoiThaoTac: new FormControl(danhMucTuVietTatRawValue.nguoiThaoTac),
      ngayThaoTac: new FormControl(danhMucTuVietTatRawValue.ngayThaoTac),
      trangThai: new FormControl(danhMucTuVietTatRawValue.trangThai),
    });
  }

  getDanhMucTuVietTat(form: DanhMucTuVietTatFormGroup): IDanhMucTuVietTat | NewDanhMucTuVietTat {
    return this.convertDanhMucTuVietTatRawValueToDanhMucTuVietTat(
      form.getRawValue() as DanhMucTuVietTatFormRawValue | NewDanhMucTuVietTatFormRawValue,
    );
  }

  resetForm(form: DanhMucTuVietTatFormGroup, danhMucTuVietTat: DanhMucTuVietTatFormGroupInput): void {
    const danhMucTuVietTatRawValue = this.convertDanhMucTuVietTatToDanhMucTuVietTatRawValue({
      ...this.getFormDefaults(),
      ...danhMucTuVietTat,
    });
    form.reset(
      {
        ...danhMucTuVietTatRawValue,
        id: { value: danhMucTuVietTatRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucTuVietTatFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      ngayThaoTac: currentTime,
    };
  }

  private convertDanhMucTuVietTatRawValueToDanhMucTuVietTat(
    rawDanhMucTuVietTat: DanhMucTuVietTatFormRawValue | NewDanhMucTuVietTatFormRawValue,
  ): IDanhMucTuVietTat | NewDanhMucTuVietTat {
    return {
      ...rawDanhMucTuVietTat,
      ngayThaoTac: dayjs(rawDanhMucTuVietTat.ngayThaoTac, DATE_TIME_FORMAT),
    };
  }

  private convertDanhMucTuVietTatToDanhMucTuVietTatRawValue(
    danhMucTuVietTat: IDanhMucTuVietTat | (Partial<NewDanhMucTuVietTat> & DanhMucTuVietTatFormDefaults),
  ): DanhMucTuVietTatFormRawValue | PartialWithRequiredKeyOf<NewDanhMucTuVietTatFormRawValue> {
    return {
      ...danhMucTuVietTat,
      ngayThaoTac: danhMucTuVietTat.ngayThaoTac ? danhMucTuVietTat.ngayThaoTac.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
