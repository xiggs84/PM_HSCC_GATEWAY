import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ITinhTrangDuongSu } from '../tinh-trang-duong-su.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tinh-trang-duong-su.test-samples';

import { TinhTrangDuongSuService } from './tinh-trang-duong-su.service';

const requireRestSample: ITinhTrangDuongSu = {
  ...sampleWithRequiredData,
};

describe('TinhTrangDuongSu Service', () => {
  let service: TinhTrangDuongSuService;
  let httpMock: HttpTestingController;
  let expectedResult: ITinhTrangDuongSu | ITinhTrangDuongSu[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TinhTrangDuongSuService);
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

    it('should create a TinhTrangDuongSu', () => {
      const tinhTrangDuongSu = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tinhTrangDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TinhTrangDuongSu', () => {
      const tinhTrangDuongSu = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tinhTrangDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TinhTrangDuongSu', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TinhTrangDuongSu', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TinhTrangDuongSu', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTinhTrangDuongSuToCollectionIfMissing', () => {
      it('should add a TinhTrangDuongSu to an empty array', () => {
        const tinhTrangDuongSu: ITinhTrangDuongSu = sampleWithRequiredData;
        expectedResult = service.addTinhTrangDuongSuToCollectionIfMissing([], tinhTrangDuongSu);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tinhTrangDuongSu);
      });

      it('should not add a TinhTrangDuongSu to an array that contains it', () => {
        const tinhTrangDuongSu: ITinhTrangDuongSu = sampleWithRequiredData;
        const tinhTrangDuongSuCollection: ITinhTrangDuongSu[] = [
          {
            ...tinhTrangDuongSu,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTinhTrangDuongSuToCollectionIfMissing(tinhTrangDuongSuCollection, tinhTrangDuongSu);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TinhTrangDuongSu to an array that doesn't contain it", () => {
        const tinhTrangDuongSu: ITinhTrangDuongSu = sampleWithRequiredData;
        const tinhTrangDuongSuCollection: ITinhTrangDuongSu[] = [sampleWithPartialData];
        expectedResult = service.addTinhTrangDuongSuToCollectionIfMissing(tinhTrangDuongSuCollection, tinhTrangDuongSu);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tinhTrangDuongSu);
      });

      it('should add only unique TinhTrangDuongSu to an array', () => {
        const tinhTrangDuongSuArray: ITinhTrangDuongSu[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tinhTrangDuongSuCollection: ITinhTrangDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addTinhTrangDuongSuToCollectionIfMissing(tinhTrangDuongSuCollection, ...tinhTrangDuongSuArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tinhTrangDuongSu: ITinhTrangDuongSu = sampleWithRequiredData;
        const tinhTrangDuongSu2: ITinhTrangDuongSu = sampleWithPartialData;
        expectedResult = service.addTinhTrangDuongSuToCollectionIfMissing([], tinhTrangDuongSu, tinhTrangDuongSu2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tinhTrangDuongSu);
        expect(expectedResult).toContain(tinhTrangDuongSu2);
      });

      it('should accept null and undefined values', () => {
        const tinhTrangDuongSu: ITinhTrangDuongSu = sampleWithRequiredData;
        expectedResult = service.addTinhTrangDuongSuToCollectionIfMissing([], null, tinhTrangDuongSu, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tinhTrangDuongSu);
      });

      it('should return initial array if no TinhTrangDuongSu is added', () => {
        const tinhTrangDuongSuCollection: ITinhTrangDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addTinhTrangDuongSuToCollectionIfMissing(tinhTrangDuongSuCollection, undefined, null);
        expect(expectedResult).toEqual(tinhTrangDuongSuCollection);
      });
    });

    describe('compareTinhTrangDuongSu', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTinhTrangDuongSu(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTinhTrangDuongSu(entity1, entity2);
        const compareResult2 = service.compareTinhTrangDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTinhTrangDuongSu(entity1, entity2);
        const compareResult2 = service.compareTinhTrangDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTinhTrangDuongSu(entity1, entity2);
        const compareResult2 = service.compareTinhTrangDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
