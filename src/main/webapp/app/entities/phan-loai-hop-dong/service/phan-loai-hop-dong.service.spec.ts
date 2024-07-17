import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IPhanLoaiHopDong } from '../phan-loai-hop-dong.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../phan-loai-hop-dong.test-samples';

import { PhanLoaiHopDongService } from './phan-loai-hop-dong.service';

const requireRestSample: IPhanLoaiHopDong = {
  ...sampleWithRequiredData,
};

describe('PhanLoaiHopDong Service', () => {
  let service: PhanLoaiHopDongService;
  let httpMock: HttpTestingController;
  let expectedResult: IPhanLoaiHopDong | IPhanLoaiHopDong[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(PhanLoaiHopDongService);
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

    it('should create a PhanLoaiHopDong', () => {
      const phanLoaiHopDong = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(phanLoaiHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PhanLoaiHopDong', () => {
      const phanLoaiHopDong = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(phanLoaiHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PhanLoaiHopDong', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PhanLoaiHopDong', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PhanLoaiHopDong', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPhanLoaiHopDongToCollectionIfMissing', () => {
      it('should add a PhanLoaiHopDong to an empty array', () => {
        const phanLoaiHopDong: IPhanLoaiHopDong = sampleWithRequiredData;
        expectedResult = service.addPhanLoaiHopDongToCollectionIfMissing([], phanLoaiHopDong);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(phanLoaiHopDong);
      });

      it('should not add a PhanLoaiHopDong to an array that contains it', () => {
        const phanLoaiHopDong: IPhanLoaiHopDong = sampleWithRequiredData;
        const phanLoaiHopDongCollection: IPhanLoaiHopDong[] = [
          {
            ...phanLoaiHopDong,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPhanLoaiHopDongToCollectionIfMissing(phanLoaiHopDongCollection, phanLoaiHopDong);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PhanLoaiHopDong to an array that doesn't contain it", () => {
        const phanLoaiHopDong: IPhanLoaiHopDong = sampleWithRequiredData;
        const phanLoaiHopDongCollection: IPhanLoaiHopDong[] = [sampleWithPartialData];
        expectedResult = service.addPhanLoaiHopDongToCollectionIfMissing(phanLoaiHopDongCollection, phanLoaiHopDong);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(phanLoaiHopDong);
      });

      it('should add only unique PhanLoaiHopDong to an array', () => {
        const phanLoaiHopDongArray: IPhanLoaiHopDong[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const phanLoaiHopDongCollection: IPhanLoaiHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addPhanLoaiHopDongToCollectionIfMissing(phanLoaiHopDongCollection, ...phanLoaiHopDongArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const phanLoaiHopDong: IPhanLoaiHopDong = sampleWithRequiredData;
        const phanLoaiHopDong2: IPhanLoaiHopDong = sampleWithPartialData;
        expectedResult = service.addPhanLoaiHopDongToCollectionIfMissing([], phanLoaiHopDong, phanLoaiHopDong2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(phanLoaiHopDong);
        expect(expectedResult).toContain(phanLoaiHopDong2);
      });

      it('should accept null and undefined values', () => {
        const phanLoaiHopDong: IPhanLoaiHopDong = sampleWithRequiredData;
        expectedResult = service.addPhanLoaiHopDongToCollectionIfMissing([], null, phanLoaiHopDong, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(phanLoaiHopDong);
      });

      it('should return initial array if no PhanLoaiHopDong is added', () => {
        const phanLoaiHopDongCollection: IPhanLoaiHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addPhanLoaiHopDongToCollectionIfMissing(phanLoaiHopDongCollection, undefined, null);
        expect(expectedResult).toEqual(phanLoaiHopDongCollection);
      });
    });

    describe('comparePhanLoaiHopDong', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePhanLoaiHopDong(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePhanLoaiHopDong(entity1, entity2);
        const compareResult2 = service.comparePhanLoaiHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePhanLoaiHopDong(entity1, entity2);
        const compareResult2 = service.comparePhanLoaiHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePhanLoaiHopDong(entity1, entity2);
        const compareResult2 = service.comparePhanLoaiHopDong(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
