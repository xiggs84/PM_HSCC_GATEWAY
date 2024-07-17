import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-the-html.test-samples';

import { DanhMucTheHtmlFormService } from './danh-muc-the-html-form.service';

describe('DanhMucTheHtml Form Service', () => {
  let service: DanhMucTheHtmlFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucTheHtmlFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucTheHtmlFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucTheHtmlFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idType: expect.any(Object),
            type: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucTheHtml should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucTheHtmlFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idType: expect.any(Object),
            type: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucTheHtml', () => {
      it('should return NewDanhMucTheHtml for default DanhMucTheHtml initial value', () => {
        const formGroup = service.createDanhMucTheHtmlFormGroup(sampleWithNewData);

        const danhMucTheHtml = service.getDanhMucTheHtml(formGroup) as any;

        expect(danhMucTheHtml).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucTheHtml for empty DanhMucTheHtml initial value', () => {
        const formGroup = service.createDanhMucTheHtmlFormGroup();

        const danhMucTheHtml = service.getDanhMucTheHtml(formGroup) as any;

        expect(danhMucTheHtml).toMatchObject({});
      });

      it('should return IDanhMucTheHtml', () => {
        const formGroup = service.createDanhMucTheHtmlFormGroup(sampleWithRequiredData);

        const danhMucTheHtml = service.getDanhMucTheHtml(formGroup) as any;

        expect(danhMucTheHtml).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucTheHtml should not enable id FormControl', () => {
        const formGroup = service.createDanhMucTheHtmlFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucTheHtml should disable id FormControl', () => {
        const formGroup = service.createDanhMucTheHtmlFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
