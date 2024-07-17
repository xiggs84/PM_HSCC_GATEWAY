import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../quan-he-master.test-samples';

import { QuanHeMasterFormService } from './quan-he-master-form.service';

describe('QuanHeMaster Form Service', () => {
  let service: QuanHeMasterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanHeMasterFormService);
  });

  describe('Service methods', () => {
    describe('createQuanHeMasterFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createQuanHeMasterFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDuongSu: expect.any(Object),
            idDuongSuQh: expect.any(Object),
          }),
        );
      });

      it('passing IQuanHeMaster should create a new form with FormGroup', () => {
        const formGroup = service.createQuanHeMasterFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDuongSu: expect.any(Object),
            idDuongSuQh: expect.any(Object),
          }),
        );
      });
    });

    describe('getQuanHeMaster', () => {
      it('should return NewQuanHeMaster for default QuanHeMaster initial value', () => {
        const formGroup = service.createQuanHeMasterFormGroup(sampleWithNewData);

        const quanHeMaster = service.getQuanHeMaster(formGroup) as any;

        expect(quanHeMaster).toMatchObject(sampleWithNewData);
      });

      it('should return NewQuanHeMaster for empty QuanHeMaster initial value', () => {
        const formGroup = service.createQuanHeMasterFormGroup();

        const quanHeMaster = service.getQuanHeMaster(formGroup) as any;

        expect(quanHeMaster).toMatchObject({});
      });

      it('should return IQuanHeMaster', () => {
        const formGroup = service.createQuanHeMasterFormGroup(sampleWithRequiredData);

        const quanHeMaster = service.getQuanHeMaster(formGroup) as any;

        expect(quanHeMaster).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IQuanHeMaster should not enable id FormControl', () => {
        const formGroup = service.createQuanHeMasterFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewQuanHeMaster should disable id FormControl', () => {
        const formGroup = service.createQuanHeMasterFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
