import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucTinh } from '../danh-muc-tinh.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-tinh.test-samples';

import { DanhMucTinhService } from './danh-muc-tinh.service';

const requireRestSample: IDanhMucTinh = {
  ...sampleWithRequiredData,
};

describe('DanhMucTinh Service', () => {
  let service: DanhMucTinhService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucTinh | IDanhMucTinh[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucTinhService);
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

    it('should create a DanhMucTinh', () => {
      const danhMucTinh = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucTinh).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucTinh', () => {
      const danhMucTinh = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucTinh).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucTinh', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucTinh', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucTinh', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucTinhToCollectionIfMissing', () => {
      it('should add a DanhMucTinh to an empty array', () => {
        const danhMucTinh: IDanhMucTinh = sampleWithRequiredData;
        expectedResult = service.addDanhMucTinhToCollectionIfMissing([], danhMucTinh);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucTinh);
      });

      it('should not add a DanhMucTinh to an array that contains it', () => {
        const danhMucTinh: IDanhMucTinh = sampleWithRequiredData;
        const danhMucTinhCollection: IDanhMucTinh[] = [
          {
            ...danhMucTinh,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucTinhToCollectionIfMissing(danhMucTinhCollection, danhMucTinh);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucTinh to an array that doesn't contain it", () => {
        const danhMucTinh: IDanhMucTinh = sampleWithRequiredData;
        const danhMucTinhCollection: IDanhMucTinh[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucTinhToCollectionIfMissing(danhMucTinhCollection, danhMucTinh);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucTinh);
      });

      it('should add only unique DanhMucTinh to an array', () => {
        const danhMucTinhArray: IDanhMucTinh[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucTinhCollection: IDanhMucTinh[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucTinhToCollectionIfMissing(danhMucTinhCollection, ...danhMucTinhArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucTinh: IDanhMucTinh = sampleWithRequiredData;
        const danhMucTinh2: IDanhMucTinh = sampleWithPartialData;
        expectedResult = service.addDanhMucTinhToCollectionIfMissing([], danhMucTinh, danhMucTinh2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucTinh);
        expect(expectedResult).toContain(danhMucTinh2);
      });

      it('should accept null and undefined values', () => {
        const danhMucTinh: IDanhMucTinh = sampleWithRequiredData;
        expectedResult = service.addDanhMucTinhToCollectionIfMissing([], null, danhMucTinh, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucTinh);
      });

      it('should return initial array if no DanhMucTinh is added', () => {
        const danhMucTinhCollection: IDanhMucTinh[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucTinhToCollectionIfMissing(danhMucTinhCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucTinhCollection);
      });
    });

    describe('compareDanhMucTinh', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucTinh(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucTinh(entity1, entity2);
        const compareResult2 = service.compareDanhMucTinh(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucTinh(entity1, entity2);
        const compareResult2 = service.compareDanhMucTinh(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucTinh(entity1, entity2);
        const compareResult2 = service.compareDanhMucTinh(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
