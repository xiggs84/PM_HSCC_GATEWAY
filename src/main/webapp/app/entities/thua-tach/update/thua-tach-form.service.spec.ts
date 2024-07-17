import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../thua-tach.test-samples';

import { ThuaTachFormService } from './thua-tach-form.service';

describe('ThuaTach Form Service', () => {
  let service: ThuaTachFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThuaTachFormService);
  });

  describe('Service methods', () => {
    describe('createThuaTachFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createThuaTachFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idThuaTach: expect.any(Object),
            idTaiSan: expect.any(Object),
            thongTinThuaTach: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });

      it('passing IThuaTach should create a new form with FormGroup', () => {
        const formGroup = service.createThuaTachFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idThuaTach: expect.any(Object),
            idTaiSan: expect.any(Object),
            thongTinThuaTach: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });
    });

    describe('getThuaTach', () => {
      it('should return NewThuaTach for default ThuaTach initial value', () => {
        const formGroup = service.createThuaTachFormGroup(sampleWithNewData);

        const thuaTach = service.getThuaTach(formGroup) as any;

        expect(thuaTach).toMatchObject(sampleWithNewData);
      });

      it('should return NewThuaTach for empty ThuaTach initial value', () => {
        const formGroup = service.createThuaTachFormGroup();

        const thuaTach = service.getThuaTach(formGroup) as any;

        expect(thuaTach).toMatchObject({});
      });

      it('should return IThuaTach', () => {
        const formGroup = service.createThuaTachFormGroup(sampleWithRequiredData);

        const thuaTach = service.getThuaTach(formGroup) as any;

        expect(thuaTach).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IThuaTach should not enable id FormControl', () => {
        const formGroup = service.createThuaTachFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewThuaTach should disable id FormControl', () => {
        const formGroup = service.createThuaTachFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
