import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-ngoai-te.test-samples';

import { DanhMucNgoaiTeFormService } from './danh-muc-ngoai-te-form.service';

describe('DanhMucNgoaiTe Form Service', () => {
  let service: DanhMucNgoaiTeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucNgoaiTeFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucNgoaiTeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucNgoaiTeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoai: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucNgoaiTe should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucNgoaiTeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoai: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucNgoaiTe', () => {
      it('should return NewDanhMucNgoaiTe for default DanhMucNgoaiTe initial value', () => {
        const formGroup = service.createDanhMucNgoaiTeFormGroup(sampleWithNewData);

        const danhMucNgoaiTe = service.getDanhMucNgoaiTe(formGroup) as any;

        expect(danhMucNgoaiTe).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucNgoaiTe for empty DanhMucNgoaiTe initial value', () => {
        const formGroup = service.createDanhMucNgoaiTeFormGroup();

        const danhMucNgoaiTe = service.getDanhMucNgoaiTe(formGroup) as any;

        expect(danhMucNgoaiTe).toMatchObject({});
      });

      it('should return IDanhMucNgoaiTe', () => {
        const formGroup = service.createDanhMucNgoaiTeFormGroup(sampleWithRequiredData);

        const danhMucNgoaiTe = service.getDanhMucNgoaiTe(formGroup) as any;

        expect(danhMucNgoaiTe).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucNgoaiTe should not enable id FormControl', () => {
        const formGroup = service.createDanhMucNgoaiTeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucNgoaiTe should disable id FormControl', () => {
        const formGroup = service.createDanhMucNgoaiTeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
