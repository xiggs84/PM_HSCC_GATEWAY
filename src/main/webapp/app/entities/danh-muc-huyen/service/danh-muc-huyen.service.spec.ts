import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucHuyen } from '../danh-muc-huyen.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-huyen.test-samples';

import { DanhMucHuyenService } from './danh-muc-huyen.service';

const requireRestSample: IDanhMucHuyen = {
  ...sampleWithRequiredData,
};

describe('DanhMucHuyen Service', () => {
  let service: DanhMucHuyenService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucHuyen | IDanhMucHuyen[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucHuyenService);
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

    it('should create a DanhMucHuyen', () => {
      const danhMucHuyen = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucHuyen).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucHuyen', () => {
      const danhMucHuyen = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucHuyen).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucHuyen', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucHuyen', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucHuyen', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucHuyenToCollectionIfMissing', () => {
      it('should add a DanhMucHuyen to an empty array', () => {
        const danhMucHuyen: IDanhMucHuyen = sampleWithRequiredData;
        expectedResult = service.addDanhMucHuyenToCollectionIfMissing([], danhMucHuyen);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucHuyen);
      });

      it('should not add a DanhMucHuyen to an array that contains it', () => {
        const danhMucHuyen: IDanhMucHuyen = sampleWithRequiredData;
        const danhMucHuyenCollection: IDanhMucHuyen[] = [
          {
            ...danhMucHuyen,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucHuyenToCollectionIfMissing(danhMucHuyenCollection, danhMucHuyen);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucHuyen to an array that doesn't contain it", () => {
        const danhMucHuyen: IDanhMucHuyen = sampleWithRequiredData;
        const danhMucHuyenCollection: IDanhMucHuyen[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucHuyenToCollectionIfMissing(danhMucHuyenCollection, danhMucHuyen);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucHuyen);
      });

      it('should add only unique DanhMucHuyen to an array', () => {
        const danhMucHuyenArray: IDanhMucHuyen[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucHuyenCollection: IDanhMucHuyen[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucHuyenToCollectionIfMissing(danhMucHuyenCollection, ...danhMucHuyenArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucHuyen: IDanhMucHuyen = sampleWithRequiredData;
        const danhMucHuyen2: IDanhMucHuyen = sampleWithPartialData;
        expectedResult = service.addDanhMucHuyenToCollectionIfMissing([], danhMucHuyen, danhMucHuyen2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucHuyen);
        expect(expectedResult).toContain(danhMucHuyen2);
      });

      it('should accept null and undefined values', () => {
        const danhMucHuyen: IDanhMucHuyen = sampleWithRequiredData;
        expectedResult = service.addDanhMucHuyenToCollectionIfMissing([], null, danhMucHuyen, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucHuyen);
      });

      it('should return initial array if no DanhMucHuyen is added', () => {
        const danhMucHuyenCollection: IDanhMucHuyen[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucHuyenToCollectionIfMissing(danhMucHuyenCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucHuyenCollection);
      });
    });

    describe('compareDanhMucHuyen', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucHuyen(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucHuyen(entity1, entity2);
        const compareResult2 = service.compareDanhMucHuyen(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucHuyen(entity1, entity2);
        const compareResult2 = service.compareDanhMucHuyen(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucHuyen(entity1, entity2);
        const compareResult2 = service.compareDanhMucHuyen(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
