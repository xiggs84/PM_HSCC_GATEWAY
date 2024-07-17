import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-cap-quan-ly.test-samples';

import { DanhMucCapQuanLyFormService } from './danh-muc-cap-quan-ly-form.service';

describe('DanhMucCapQuanLy Form Service', () => {
  let service: DanhMucCapQuanLyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucCapQuanLyFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucCapQuanLyFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucCapQuanLyFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCapQl: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucCapQuanLy should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucCapQuanLyFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCapQl: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucCapQuanLy', () => {
      it('should return NewDanhMucCapQuanLy for default DanhMucCapQuanLy initial value', () => {
        const formGroup = service.createDanhMucCapQuanLyFormGroup(sampleWithNewData);

        const danhMucCapQuanLy = service.getDanhMucCapQuanLy(formGroup) as any;

        expect(danhMucCapQuanLy).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucCapQuanLy for empty DanhMucCapQuanLy initial value', () => {
        const formGroup = service.createDanhMucCapQuanLyFormGroup();

        const danhMucCapQuanLy = service.getDanhMucCapQuanLy(formGroup) as any;

        expect(danhMucCapQuanLy).toMatchObject({});
      });

      it('should return IDanhMucCapQuanLy', () => {
        const formGroup = service.createDanhMucCapQuanLyFormGroup(sampleWithRequiredData);

        const danhMucCapQuanLy = service.getDanhMucCapQuanLy(formGroup) as any;

        expect(danhMucCapQuanLy).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucCapQuanLy should not enable id FormControl', () => {
        const formGroup = service.createDanhMucCapQuanLyFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucCapQuanLy should disable id FormControl', () => {
        const formGroup = service.createDanhMucCapQuanLyFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
