import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDanhMucCanBo } from '../danh-muc-can-bo.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-can-bo.test-samples';

import { DanhMucCanBoService, RestDanhMucCanBo } from './danh-muc-can-bo.service';

const requireRestSample: RestDanhMucCanBo = {
  ...sampleWithRequiredData,
  namSinh: sampleWithRequiredData.namSinh?.format(DATE_FORMAT),
};

describe('DanhMucCanBo Service', () => {
  let service: DanhMucCanBoService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucCanBo | IDanhMucCanBo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucCanBoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a DanhMucCanBo', () => {
      const danhMucCanBo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucCanBo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucCanBo', () => {
      const danhMucCanBo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucCanBo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucCanBo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucCanBo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucCanBo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucCanBoToCollectionIfMissing', () => {
      it('should add a DanhMucCanBo to an empty array', () => {
        const danhMucCanBo: IDanhMucCanBo = sampleWithRequiredData;
        expectedResult = service.addDanhMucCanBoToCollectionIfMissing([], danhMucCanBo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucCanBo);
      });

      it('should not add a DanhMucCanBo to an array that contains it', () => {
        const danhMucCanBo: IDanhMucCanBo = sampleWithRequiredData;
        const danhMucCanBoCollection: IDanhMucCanBo[] = [
          {
            ...danhMucCanBo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucCanBoToCollectionIfMissing(danhMucCanBoCollection, danhMucCanBo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucCanBo to an array that doesn't contain it", () => {
        const danhMucCanBo: IDanhMucCanBo = sampleWithRequiredData;
        const danhMucCanBoCollection: IDanhMucCanBo[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucCanBoToCollectionIfMissing(danhMucCanBoCollection, danhMucCanBo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucCanBo);
      });

      it('should add only unique DanhMucCanBo to an array', () => {
        const danhMucCanBoArray: IDanhMucCanBo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucCanBoCollection: IDanhMucCanBo[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucCanBoToCollectionIfMissing(danhMucCanBoCollection, ...danhMucCanBoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucCanBo: IDanhMucCanBo = sampleWithRequiredData;
        const danhMucCanBo2: IDanhMucCanBo = sampleWithPartialData;
        expectedResult = service.addDanhMucCanBoToCollectionIfMissing([], danhMucCanBo, danhMucCanBo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucCanBo);
        expect(expectedResult).toContain(danhMucCanBo2);
      });

      it('should accept null and undefined values', () => {
        const danhMucCanBo: IDanhMucCanBo = sampleWithRequiredData;
        expectedResult = service.addDanhMucCanBoToCollectionIfMissing([], null, danhMucCanBo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucCanBo);
      });

      it('should return initial array if no DanhMucCanBo is added', () => {
        const danhMucCanBoCollection: IDanhMucCanBo[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucCanBoToCollectionIfMissing(danhMucCanBoCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucCanBoCollection);
      });
    });

    describe('compareDanhMucCanBo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucCanBo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucCanBo(entity1, entity2);
        const compareResult2 = service.compareDanhMucCanBo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucCanBo(entity1, entity2);
        const compareResult2 = service.compareDanhMucCanBo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucCanBo(entity1, entity2);
        const compareResult2 = service.compareDanhMucCanBo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
