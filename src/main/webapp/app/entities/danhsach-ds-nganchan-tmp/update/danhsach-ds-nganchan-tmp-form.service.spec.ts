import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danhsach-ds-nganchan-tmp.test-samples';

import { DanhsachDsNganchanTmpFormService } from './danhsach-ds-nganchan-tmp-form.service';

describe('DanhsachDsNganchanTmp Form Service', () => {
  let service: DanhsachDsNganchanTmpFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhsachDsNganchanTmpFormService);
  });

  describe('Service methods', () => {
    describe('createDanhsachDsNganchanTmpFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhsachDsNganchanTmpFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDoiTuong: expect.any(Object),
            ngayNganChan: expect.any(Object),
            soHsCv: expect.any(Object),
            soCc: expect.any(Object),
            soVaoSo: expect.any(Object),
            moTa: expect.any(Object),
            idDoituongGoc: expect.any(Object),
            loaiNganChan: expect.any(Object),
            loaiDoiTuong: expect.any(Object),
          }),
        );
      });

      it('passing IDanhsachDsNganchanTmp should create a new form with FormGroup', () => {
        const formGroup = service.createDanhsachDsNganchanTmpFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDoiTuong: expect.any(Object),
            ngayNganChan: expect.any(Object),
            soHsCv: expect.any(Object),
            soCc: expect.any(Object),
            soVaoSo: expect.any(Object),
            moTa: expect.any(Object),
            idDoituongGoc: expect.any(Object),
            loaiNganChan: expect.any(Object),
            loaiDoiTuong: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhsachDsNganchanTmp', () => {
      it('should return NewDanhsachDsNganchanTmp for default DanhsachDsNganchanTmp initial value', () => {
        const formGroup = service.createDanhsachDsNganchanTmpFormGroup(sampleWithNewData);

        const danhsachDsNganchanTmp = service.getDanhsachDsNganchanTmp(formGroup) as any;

        expect(danhsachDsNganchanTmp).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhsachDsNganchanTmp for empty DanhsachDsNganchanTmp initial value', () => {
        const formGroup = service.createDanhsachDsNganchanTmpFormGroup();

        const danhsachDsNganchanTmp = service.getDanhsachDsNganchanTmp(formGroup) as any;

        expect(danhsachDsNganchanTmp).toMatchObject({});
      });

      it('should return IDanhsachDsNganchanTmp', () => {
        const formGroup = service.createDanhsachDsNganchanTmpFormGroup(sampleWithRequiredData);

        const danhsachDsNganchanTmp = service.getDanhsachDsNganchanTmp(formGroup) as any;

        expect(danhsachDsNganchanTmp).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhsachDsNganchanTmp should not enable id FormControl', () => {
        const formGroup = service.createDanhsachDsNganchanTmpFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhsachDsNganchanTmp should disable id FormControl', () => {
        const formGroup = service.createDanhsachDsNganchanTmpFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
