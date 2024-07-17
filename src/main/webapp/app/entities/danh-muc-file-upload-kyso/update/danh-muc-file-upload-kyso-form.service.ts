import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IDanhMucFileUploadKyso, NewDanhMucFileUploadKyso } from '../danh-muc-file-upload-kyso.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucFileUploadKyso for edit and NewDanhMucFileUploadKysoFormGroupInput for create.
 */
type DanhMucFileUploadKysoFormGroupInput = IDanhMucFileUploadKyso | PartialWithRequiredKeyOf<NewDanhMucFileUploadKyso>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IDanhMucFileUploadKyso | NewDanhMucFileUploadKyso> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

type DanhMucFileUploadKysoFormRawValue = FormValueOf<IDanhMucFileUploadKyso>;

type NewDanhMucFileUploadKysoFormRawValue = FormValueOf<NewDanhMucFileUploadKyso>;

type DanhMucFileUploadKysoFormDefaults = Pick<NewDanhMucFileUploadKyso, 'id' | 'ngayThaoTac'>;

type DanhMucFileUploadKysoFormGroupContent = {
  id: FormControl<DanhMucFileUploadKysoFormRawValue['id'] | NewDanhMucFileUploadKyso['id']>;
  idFile: FormControl<DanhMucFileUploadKysoFormRawValue['idFile']>;
  tenFile: FormControl<DanhMucFileUploadKysoFormRawValue['tenFile']>;
  fileUrl: FormControl<DanhMucFileUploadKysoFormRawValue['fileUrl']>;
  fileSignedUrl: FormControl<DanhMucFileUploadKysoFormRawValue['fileSignedUrl']>;
  idCanBo: FormControl<DanhMucFileUploadKysoFormRawValue['idCanBo']>;
  idDonVi: FormControl<DanhMucFileUploadKysoFormRawValue['idDonVi']>;
  ngayThaoTac: FormControl<DanhMucFileUploadKysoFormRawValue['ngayThaoTac']>;
  trangThai: FormControl<DanhMucFileUploadKysoFormRawValue['trangThai']>;
  filePdfUrl: FormControl<DanhMucFileUploadKysoFormRawValue['filePdfUrl']>;
};

export type DanhMucFileUploadKysoFormGroup = FormGroup<DanhMucFileUploadKysoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucFileUploadKysoFormService {
  createDanhMucFileUploadKysoFormGroup(
    danhMucFileUploadKyso: DanhMucFileUploadKysoFormGroupInput = { id: null },
  ): DanhMucFileUploadKysoFormGroup {
    const danhMucFileUploadKysoRawValue = this.convertDanhMucFileUploadKysoToDanhMucFileUploadKysoRawValue({
      ...this.getFormDefaults(),
      ...danhMucFileUploadKyso,
    });
    return new FormGroup<DanhMucFileUploadKysoFormGroupContent>({
      id: new FormControl(
        { value: danhMucFileUploadKysoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idFile: new FormControl(danhMucFileUploadKysoRawValue.idFile),
      tenFile: new FormControl(danhMucFileUploadKysoRawValue.tenFile),
      fileUrl: new FormControl(danhMucFileUploadKysoRawValue.fileUrl),
      fileSignedUrl: new FormControl(danhMucFileUploadKysoRawValue.fileSignedUrl),
      idCanBo: new FormControl(danhMucFileUploadKysoRawValue.idCanBo),
      idDonVi: new FormControl(danhMucFileUploadKysoRawValue.idDonVi),
      ngayThaoTac: new FormControl(danhMucFileUploadKysoRawValue.ngayThaoTac),
      trangThai: new FormControl(danhMucFileUploadKysoRawValue.trangThai),
      filePdfUrl: new FormControl(danhMucFileUploadKysoRawValue.filePdfUrl),
    });
  }

  getDanhMucFileUploadKyso(form: DanhMucFileUploadKysoFormGroup): IDanhMucFileUploadKyso | NewDanhMucFileUploadKyso {
    return this.convertDanhMucFileUploadKysoRawValueToDanhMucFileUploadKyso(
      form.getRawValue() as DanhMucFileUploadKysoFormRawValue | NewDanhMucFileUploadKysoFormRawValue,
    );
  }

  resetForm(form: DanhMucFileUploadKysoFormGroup, danhMucFileUploadKyso: DanhMucFileUploadKysoFormGroupInput): void {
    const danhMucFileUploadKysoRawValue = this.convertDanhMucFileUploadKysoToDanhMucFileUploadKysoRawValue({
      ...this.getFormDefaults(),
      ...danhMucFileUploadKyso,
    });
    form.reset(
      {
        ...danhMucFileUploadKysoRawValue,
        id: { value: danhMucFileUploadKysoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucFileUploadKysoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      ngayThaoTac: currentTime,
    };
  }

  private convertDanhMucFileUploadKysoRawValueToDanhMucFileUploadKyso(
    rawDanhMucFileUploadKyso: DanhMucFileUploadKysoFormRawValue | NewDanhMucFileUploadKysoFormRawValue,
  ): IDanhMucFileUploadKyso | NewDanhMucFileUploadKyso {
    return {
      ...rawDanhMucFileUploadKyso,
      ngayThaoTac: dayjs(rawDanhMucFileUploadKyso.ngayThaoTac, DATE_TIME_FORMAT),
    };
  }

  private convertDanhMucFileUploadKysoToDanhMucFileUploadKysoRawValue(
    danhMucFileUploadKyso: IDanhMucFileUploadKyso | (Partial<NewDanhMucFileUploadKyso> & DanhMucFileUploadKysoFormDefaults),
  ): DanhMucFileUploadKysoFormRawValue | PartialWithRequiredKeyOf<NewDanhMucFileUploadKysoFormRawValue> {
    return {
      ...danhMucFileUploadKyso,
      ngayThaoTac: danhMucFileUploadKyso.ngayThaoTac ? danhMucFileUploadKyso.ngayThaoTac.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
