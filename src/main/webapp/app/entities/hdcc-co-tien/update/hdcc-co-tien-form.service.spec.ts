import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../hdcc-co-tien.test-samples';

import { HdccCoTienFormService } from './hdcc-co-tien-form.service';

describe('HdccCoTien Form Service', () => {
  let service: HdccCoTienFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HdccCoTienFormService);
  });

  describe('Service methods', () => {
    describe('createHdccCoTienFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHdccCoTienFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idMaster: expect.any(Object),
            soCongChung: expect.any(Object),
            soTienRutTrich: expect.any(Object),
          }),
        );
      });

      it('passing IHdccCoTien should create a new form with FormGroup', () => {
        const formGroup = service.createHdccCoTienFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idMaster: expect.any(Object),
            soCongChung: expect.any(Object),
            soTienRutTrich: expect.any(Object),
          }),
        );
      });
    });

    describe('getHdccCoTien', () => {
      it('should return NewHdccCoTien for default HdccCoTien initial value', () => {
        const formGroup = service.createHdccCoTienFormGroup(sampleWithNewData);

        const hdccCoTien = service.getHdccCoTien(formGroup) as any;

        expect(hdccCoTien).toMatchObject(sampleWithNewData);
      });

      it('should return NewHdccCoTien for empty HdccCoTien initial value', () => {
        const formGroup = service.createHdccCoTienFormGroup();

        const hdccCoTien = service.getHdccCoTien(formGroup) as any;

        expect(hdccCoTien).toMatchObject({});
      });

      it('should return IHdccCoTien', () => {
        const formGroup = service.createHdccCoTienFormGroup(sampleWithRequiredData);

        const hdccCoTien = service.getHdccCoTien(formGroup) as any;

        expect(hdccCoTien).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHdccCoTien should not enable id FormControl', () => {
        const formGroup = service.createHdccCoTienFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHdccCoTien should disable id FormControl', () => {
        const formGroup = service.createHdccCoTienFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
