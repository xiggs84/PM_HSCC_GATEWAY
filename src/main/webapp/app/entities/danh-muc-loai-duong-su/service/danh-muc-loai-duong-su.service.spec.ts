import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucLoaiDuongSu } from '../danh-muc-loai-duong-su.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danh-muc-loai-duong-su.test-samples';

import { DanhMucLoaiDuongSuService } from './danh-muc-loai-duong-su.service';

const requireRestSample: IDanhMucLoaiDuongSu = {
  ...sampleWithRequiredData,
};

describe('DanhMucLoaiDuongSu Service', () => {
  let service: DanhMucLoaiDuongSuService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucLoaiDuongSu | IDanhMucLoaiDuongSu[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucLoaiDuongSuService);
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

    it('should create a DanhMucLoaiDuongSu', () => {
      const danhMucLoaiDuongSu = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucLoaiDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucLoaiDuongSu', () => {
      const danhMucLoaiDuongSu = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucLoaiDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucLoaiDuongSu', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucLoaiDuongSu', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucLoaiDuongSu', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucLoaiDuongSuToCollectionIfMissing', () => {
      it('should add a DanhMucLoaiDuongSu to an empty array', () => {
        const danhMucLoaiDuongSu: IDanhMucLoaiDuongSu = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiDuongSuToCollectionIfMissing([], danhMucLoaiDuongSu);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiDuongSu);
      });

      it('should not add a DanhMucLoaiDuongSu to an array that contains it', () => {
        const danhMucLoaiDuongSu: IDanhMucLoaiDuongSu = sampleWithRequiredData;
        const danhMucLoaiDuongSuCollection: IDanhMucLoaiDuongSu[] = [
          {
            ...danhMucLoaiDuongSu,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucLoaiDuongSuToCollectionIfMissing(danhMucLoaiDuongSuCollection, danhMucLoaiDuongSu);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucLoaiDuongSu to an array that doesn't contain it", () => {
        const danhMucLoaiDuongSu: IDanhMucLoaiDuongSu = sampleWithRequiredData;
        const danhMucLoaiDuongSuCollection: IDanhMucLoaiDuongSu[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucLoaiDuongSuToCollectionIfMissing(danhMucLoaiDuongSuCollection, danhMucLoaiDuongSu);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiDuongSu);
      });

      it('should add only unique DanhMucLoaiDuongSu to an array', () => {
        const danhMucLoaiDuongSuArray: IDanhMucLoaiDuongSu[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucLoaiDuongSuCollection: IDanhMucLoaiDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiDuongSuToCollectionIfMissing(danhMucLoaiDuongSuCollection, ...danhMucLoaiDuongSuArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucLoaiDuongSu: IDanhMucLoaiDuongSu = sampleWithRequiredData;
        const danhMucLoaiDuongSu2: IDanhMucLoaiDuongSu = sampleWithPartialData;
        expectedResult = service.addDanhMucLoaiDuongSuToCollectionIfMissing([], danhMucLoaiDuongSu, danhMucLoaiDuongSu2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiDuongSu);
        expect(expectedResult).toContain(danhMucLoaiDuongSu2);
      });

      it('should accept null and undefined values', () => {
        const danhMucLoaiDuongSu: IDanhMucLoaiDuongSu = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiDuongSuToCollectionIfMissing([], null, danhMucLoaiDuongSu, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiDuongSu);
      });

      it('should return initial array if no DanhMucLoaiDuongSu is added', () => {
        const danhMucLoaiDuongSuCollection: IDanhMucLoaiDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiDuongSuToCollectionIfMissing(danhMucLoaiDuongSuCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucLoaiDuongSuCollection);
      });
    });

    describe('compareDanhMucLoaiDuongSu', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucLoaiDuongSu(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucLoaiDuongSu(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucLoaiDuongSu(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucLoaiDuongSu(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
